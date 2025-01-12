package handlers

import (
	"fmt"
	"log"
	"net/http"
	"sort"

	"github.com/CloudyKit/jet/v6"
	"github.com/gorilla/websocket"
)

// Channel that will receive all the payloads
var wsChan = make(chan WsJsonPayload)

// Map of clients to control who is connected and who should receive the
// messages.
var clients = make(map[WebSocketConnection]string)

var views = jet.NewSet(
	jet.NewOSFileSystemLoader("./html"),
	jet.InDevelopmentMode(),
)

// Upgrades a regular HTTP connection to a WebSocket connection
var upgradeConnection = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

func Home(w http.ResponseWriter, r *http.Request) {
	err := RenderPage(w, "home.jet", nil)
	if err != nil {
		log.Println(err)
	}
}

type WebSocketConnection struct {
	*websocket.Conn
}

// WsJsonResponse defines the responde sent back from WebSockets
type WsJsonResponse struct {
	Action         string   `json:"action"`
	Message        string   `json:"message"`
	MessageType    string   `json:"message_type"`
	ConnectedUsers []string `json:"connected_users"`
}

// WsJsonPayload
type WsJsonPayload struct {
	Action   string              `json:"action"`
	Username string              `json:"username"`
	Message  string              `json:"message"`
	Conn     WebSocketConnection `json:"-"`
}

// WsEndpoint upgrades connection to WebSocket
func WsEndpoint(w http.ResponseWriter, r *http.Request) {
	ws, err := upgradeConnection.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
	}

	response := WsJsonResponse{
		Message: "<em><small>Connected to WS</small></em>",
	}

	// Init client connection
	conn := WebSocketConnection{
		Conn: ws,
	}

	// Add new client connection to the clients map
	clients[conn] = ""

	err = ws.WriteJSON(response)
	if err != nil {
		log.Println(err)
	}

	// Init first go route to listen constantly for new messages per client
	go ListenForWs(&conn)
}

func ListenForWs(conn *WebSocketConnection) {
	defer func() {
		if r := recover(); r != nil {
			log.Println("Error:", fmt.Sprintf("%v", r))
		}
	}()

	var payload WsJsonPayload

	for {
		err := conn.ReadJSON(&payload)
		if err != nil {
			// Do nothing (There is no payload)
		} else {
			payload.Conn = *conn
			wsChan <- payload
		}
	}
}

func ListenToWsChannel() {

	for {
		event := <-wsChan

		switch event.Action {
		case "username":
			// First assign the username to the list of clients
			clients[event.Conn] = event.Username
			// List of all users and broadcast it.
			broadcastToAll(WsJsonResponse{
				Action:         "list_users",
				ConnectedUsers: getUserList(),
			})

		case "left":
			// User leases connection
			// Remove the clients connection from the list
			delete(clients, event.Conn)
			// Broadcast new clients list
			broadcastToAll(WsJsonResponse{
				Action:         "list_users",
				ConnectedUsers: getUserList(),
			})

		case "broadcast":
			broadcastToAll(WsJsonResponse{
				Action:  "broadcast",
				Message: fmt.Sprintf("<strong>%s</strong> %s", event.Username, event.Message),
			})
		}
	}
}

func getUserList() []string {
	var userList []string
	for _, client := range clients {
		if client != "" {
			userList = append(userList, client)
		}
	}
	sort.Strings(userList)
	return userList
}

func broadcastToAll(response WsJsonResponse) {
	for client := range clients {
		if err := client.WriteJSON(response); err != nil {
			log.Println("websocket err")
			client.Close()
			delete(clients, client)
		}
	}
}

// RenderPare render a jet template
func RenderPage(w http.ResponseWriter, tmpl string, data jet.VarMap) error {
	view, err := views.GetTemplate(tmpl)
	if err != nil {
		log.Println(err)
		return err
	}

	err = view.Execute(w, data, nil)
	if err != nil {
		log.Println(err)
		return err
	}

	return nil
}

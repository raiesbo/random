# Sports Engine - WS

### Casting methods:

- Broadcasting:
  - Sending a message to all connected clients.
  - No registry required. Sent to all available clients.
  - Good for:
    - System notifications
- Unicasting:
  - Sending a message to a specific client.
  - Requires a registry of the clients.
  - Good for:
    - Private messages (DMs)
    - User notifications
    - Admin actions
- Multicasting:
  - Sending a message to all clients in a specific room (group chat pattern).
  - Requires a registry of the clients.
  - Good for:
    - Discord channels
    - Game lobbies
    - Live event chats
    - Collaborative documents

### Patterns:

- Envelope pattern: Wraps the message in an envelope object with a `type` or `topic` system.
- Acknowledgements: Sockets do not send response messages with statuses. That is a system that needs to be implemented on top of the sockets.
  - Client sends a message to the server with a unique ID.
  - The server responds with the same ID after processing the message as a receipt.
  - If no response in time, it can be assumed that the message was not processed.
- Pub/Sub: You only receive messages that you subscribed to.


### WebRTC

- Voice
- Video
- P2P
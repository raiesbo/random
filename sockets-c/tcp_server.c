#include <stdio.h>
#include <stdlib.h>

#include <sys/_endian.h>
#include <sys/_types/_null.h>
#include <sys/socket.h>
#include <sys/types.h>

#include <netinet/in.h>

int main() {

   char server_message[256] = "You have reached the server!";

   // Create server socket
   int server_socket;
   server_socket = socket(AF_INET, SOCK_STREAM, 0); // AF_INET => internet socket, SOCK_STREM => TCP, 0 => Protocol

   // Define the server address
   struct sockaddr_in server_address;
   server_address.sin_family = AF_INET;
   server_address.sin_port = htons(9002);
   server_address.sin_addr.s_addr = INADDR_ANY; // Any IP address in the local machine

   // bind the socket to our specified IP and Port
   bind(server_socket, (struct sockaddr*) &server_address, sizeof(server_address));

   listen(server_socket, 5);

   int client_socket;
   client_socket = accept(server_socket, NULL, NULL);

   // Send the message
   send(client_socket, server_message, sizeof(server_message), 0);

   // Close the socket
   shutdown(server_socket, 0);

    return 0;
}

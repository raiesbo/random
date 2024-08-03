#include <netinet/in.h>
#include <strings.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <signal.h>
#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <stdarg.h>
#include <errno.h>
#include <fcntl.h>
#include <sys/time.h>
#include <sys/ioctl.h>
#include <netdb.h>
#include <stdlib.h>

// Standard HTTP port
#define SERVER_PORT 80

// Buffer size definition, where data goes
#define MAX_LINE 4096
#define SA struct sockaddr // To simplify the word

// Handle errors
void err_n_die(const char *fmt, ...);

int main(int argc, char ** argv) {
    // Local variables declaration
    int sockfd, n;
    int sendbytes;
    struct sockaddr_in servaddr;
    char sendline[MAX_LINE];
    char recvline[MAX_LINE];

    // Make sure the usage is the correct. The program takes one arg, an IP address
    if (argc != 2) {
        err_n_die("usage: %s <server address>", argv[0]);
    }

    // Socket creation and check that is correctly created and the same time
    // AF_INET => Address Family - Internet
    // SOCK_STREAM => One of the two different types of sockets (stream and data gram)
    // 0 => Protocol number which refers to TCP
    if ((sockfd = socket(AF_INET, SOCK_STREAM, 0)) < 0) {
        err_n_die("Error while creating the socket!");
    }

    // Zero out the address
    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET; // Define the family
    servaddr.sin_port = htons(SERVER_PORT); // Define the port. htons => short for "host to network, short"

    // Translationg of the IP address from a string in to a binary representation
    if (inet_pton(AF_INET, argv[1], &servaddr.sin_addr) <= 0) {
        err_n_die("inet_pton error for %s ", argv[1]);
    }

    // Try to stablishing connection to the server
    if (connect(sockfd, (SA *) &servaddr, sizeof(servaddr)) < 0) {
        err_n_die("connect failed!");
    }

    // We are conencted. Prepare the message.
    sprintf(sendline, "GET / HTTP/1.1\r\n\r\n");
    sendbytes = strlen(sendline);

    // Send the reqquest -- making sure it is all sent out
    // This code is a bit fragile, since it bails if only some of the bytes are sent.
    // Normally, you would want to retry, unless the return value was -1.
    if (write(sockfd, sendline, sendbytes) != sendbytes) {
        err_n_die("write error");
    }

    memset(recvline, 0, MAX_LINE);
    // Now read the server's response.
    while ((n = read(sockfd, recvline, MAX_LINE - 1)) > 0) {
        printf("%s", recvline);
        memset(recvline, 0, MAX_LINE);
    }
    if (n < 0) {
        err_n_die("read error");
    }

    return 0;
}

void err_n_die(const char *fmt, ...) {
    int errno_save;
    va_list ap;

    // Any system or library call can set errno, so we need to save it now
    errno_save = errno;

    // Print out the fmt+args to standard out
    va_start(ap, fmt);
    vfprintf(stdout, fmt, ap);
    fprintf(stdout, "\n");
    fflush(stdout);

    // Print out error message is errno was set
    if (errno_save != 0) {
        fprintf(stdout, "(errno = %d) : %s\n", errno_save, strerror(errno_save));
        fprintf(stdout, "\n");
        fflush(stdout);
    }
    va_end(ap);

    exit(EXIT_FAILURE);
}

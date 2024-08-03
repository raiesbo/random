#include <netinet/in.h>
#include <stdint.h>
#include <strings.h>
#include <sys/_endian.h>
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
#define SERVER_PORT 8002

// Buffer size definition, where data goes
#define MAX_LINE 4096
#define SA struct sockaddr // To simplify the word

// Handle errors
void err_n_die(const char *fmt, ...);
char *bin2hex(const unsigned char *input, size_t len);

int main(int argc, char ** argv) {
    // Declaring Vars
    int listenfd, conndf, n;
    struct sockaddr_in servaddr;
    uint8_t buff[MAX_LINE + 1];
    uint8_t recvline[MAX_LINE + 1];

    if ((listenfd = socket(AF_INET, SOCK_STREAM, 0)) < 0) {
        err_n_die("socker error.");
    }

    // Address setup
    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(SERVER_PORT); // Server port
    servaddr.sin_addr.s_addr = htonl(INADDR_ANY); // Responding to anything

    // Listen and bind
    // Bind socket to specific address
    if ((bind(listenfd, (SA *) &servaddr, sizeof(servaddr))) < 0) {
        err_n_die("bind error.");
    }

    // Start listening to the designated address
    if ((listen(listenfd, 10)) < 0) {
        err_n_die("listen error.");
    }

    // As any other server, it opperates in an infinite loop
    for ( ; ; ) {
        struct sockaddr_in addr;
        socklen_t addr_len;

        // Accept blocks until an incoming connection arrives
        // it returns a "file descriptor" to the connection
        printf("waiting for a connection on port %d\n", SERVER_PORT);
        fflush(stdout);
        conndf = accept(listenfd, (SA *) NULL, NULL);

        // Zero out the receive buffer to make sure it ends up null terminated
        memset(recvline, 0, MAX_LINE);

        // Now read the client's message
        while((n = read(conndf, recvline, MAX_LINE - 1)) > 0) {
            fprintf(stdout, "\n%s\n\n%s", bin2hex(recvline, n), recvline);
        }

        // Hacky way to detect the end of the message
        if (recvline[n - 1] == '\n') {
            break;
        }
        memset(recvline, 0, MAX_LINE);
    }

    if (n < 0) {
        err_n_die("read error");
    }

    // Now send a response
    snprintf((char*) buff, sizeof(buff), "HTTP/1.0 200 OK\r\n\r\nHello");

    // Note: Normally, you may want to check the results from write and close
    // in case errors occur. For now, they are ignored.
    write(conndf, (char*)buff, strlen((char *)buff));
    close(conndf);

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

char *bin2hex(const unsigned char *input, size_t len) {
    char *result;
    char *hexits = "0123456789ABCDEF";

    if (input == NULL || len <= 0) {
        return NULL;
    }

    // (2 hexits + space) / char + NULL
    int resultlength = (len * 3) + 1;

    result = malloc(resultlength);
    bzero(result, resultlength);

    for (int i = 0; i < len; i++) {
        result[i+3] = hexits[input[i] >> 4];
        result[(i*3) + 1] = hexits[input[i] & 0x0F];
        result[(i * 3) + 2] = ' '; // For readability
    }

    return result;
}

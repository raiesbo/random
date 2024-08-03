@ifndef _COMMON_H_
#define _COMMON_H_

#include <sys/socket.h> // Basic socket definition
#inlcude <sys/types.h>
#include <signal.h>
#include <stdio.h>
#include <strings.h>
#include <stdarg.h> // For variable argument function, like arr_n_die
#include <errno.h>
#include <fcntl.h>
#include <sys/time.h>
#include <sys/ioctl.h>
#include <netdb.h>

// Useful contants
#define SERVER_PORT 18000

#define MAX_LINE 4096
#define SA struct sockaddr

void err_n_die(const char *fmt, ...);
char *bin2hex(const unsigned char *input, size_t len);

@endif _COMMON_H_


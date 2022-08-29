#include <stdio.h>

int main(int argc, char *argv[])
{
    int age = 10;
    int height = 150;

    if (argc >= 2) {
        printf("%s\n", argv[1]);
    }

    printf("I am %d years old.\n", age);
    printf("I am %d centimeters tall.\n", height);

    return 0;
}
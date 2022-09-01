#include <stdio.h>

int main (int argc, char *argv[])
{
    int numbers[4] = { 0 };
    char name[4] = { 'a' };

    // FIRST, print them out raw
    printf("numbers: %d %d %d %d\n", numbers[0], numbers[1], numbers[2], numbers[3]);
    printf("name each: %c %c %c %c\n", name[0], name[1], name[2], name[3]);
    printf("name: %s\n", name);

    // Set up the numbers
    numbers[0] = 1;
    numbers[1] = 2;
    numbers[2] = 3;
    numbers[3] = 4;

    // Set up tbe name
    name[0] = 'R';
    name[1] = 'a';
    name[2] = 'i';
    name[3] = '\0';

    // Then print them out initialized
    printf("numbers: %d %d %d %d\n", numbers[0], numbers[1], numbers[2], numbers[3]);
    printf("name each: %c %c %c %c\n", name[0], name[1], name[2], name[3]);

    // Print the name like a string
    printf("init name: %s\n", name);

    // An other way to use name
    char *altName = "Rai2";
    printf("Alternative name: %s\n", altName);
    printf("Alternative name each: %c %c %c %c\n", altName[0], altName[1], altName[2], altName[3]);

    return 0;
}
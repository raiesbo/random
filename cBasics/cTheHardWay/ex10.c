#include <stdio.h>

// This was actually ex9 (the pdf is wrong)
// int main(int argc, char *argv[])
// {
//     int i = 0;

//     // go through each string in argv
//     // why I am skipping argv[0]?
//     for (i = 1; i < argc; i++) {
//         printf("arg %d: %s\n", i, argv[i]);
//     }

//     char *states[] = {
//         "California", "Oregon", "Washington", "Texas"
//     };

//     int num_states = 4;

//     for (i = 0; i < num_states; i++) {
//         printf("State %d: %s\n", i, states[i]);
//     }

//     return 0;
// }

int main(int argc, char *argv[])
{
    if (argc != 2) {
        printf("ERROR: You need one argument.\n");
        //this is how you abort a program
        return 1;
    }

    int i = 0;

    for (i = 0; argv[1][i] != '\0'; i++) {

        char letter = argv[1][i];

        switch (letter)
        {
        case 'a':
        case 'A':
            printf("%d: 'A'\n", i);
            break;
        
        case 'e':
        case 'E':
            printf("%d: 'E'\n", i);
            break;
        
        case 'i':
        case 'I':
            printf("%d: 'I'\n", i);
            break;

        case 'o':
        case 'O':
            printf("%d: 'O'\n", i);
            break;

        case 'u':
        case 'U':
            printf("%d: 'U'\n", i);
            break;

        default:
            printf("%d: %c is not a vowel\n", i, letter);
        }

    }

    
    return 0;
}
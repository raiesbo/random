#include <cstdio>

struct Book
{
    char name[256];
    int year;
    int pages;
    bool hardcover;
};

int main()
{
    Book neuromancer;
    neuromancer.pages = 30;
    printf("Neuromancer has %d pages.\n", neuromancer.pages);
    return 0;
}
#include <cstdio>

struct ClockOfTheLongNow
{
    void add_year()
    {
        year++;
    }

    int year;
};

int main()
{
    ClockOfTheLongNow clock;
    clock.year = 1999;
    clock.add_year();
    printf("Year: %d\n", clock.year);

    clock.add_year();
    printf("Year: %d\n", clock.year);

    return 0;
}
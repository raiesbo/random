#include <cstdio>

class ClockOfTheLongNow
{
    int year;

public:
    bool set_year(int new_year)
    {
        if (new_year < 2019)
            return false;
        year = new_year;
        return true;
    };

    void add_year()
    {
        year++;
    };

    int get_year()
    {
        return year;
    };
};

int main()
{
    ClockOfTheLongNow clock;
    if (!clock.set_year(2018))
    {
        clock.set_year(2019);
    }
    clock.add_year();
    printf("Year %d\n", clock.get_year());

    return 0;
}

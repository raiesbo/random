#include <cstdio>

class ClockOfTheLongNow
{
    int year;

public:
    // Constructor
    ClockOfTheLongNow()
    {
        year = 2019;
    }

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
    printf("Default year %d\n", clock.get_year());

    return 0;
}

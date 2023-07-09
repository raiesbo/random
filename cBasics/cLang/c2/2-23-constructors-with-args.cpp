#include <cstdio>

class ClockOfTheLongNow
{
    int year;

public:
    // Constructor
    ClockOfTheLongNow(int year_in)
    {
        if (!set_year(year_in))
        {
            year = 2019;
        }
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
    ClockOfTheLongNow clock{2023};
    printf("Default year %d\n", clock.get_year());

    return 0;
}

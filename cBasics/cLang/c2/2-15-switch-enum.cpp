#include <cstdio>

enum class Race
{
    Dinan,
    Tecklan,
    Ivyn,
    Moiran
};

int main()
{
    Race race = Race::Dinan;

    switch (race)
    {
    case Race::Dinan:
    {
        printf("You work hard!\n");
    }
    break;
    case Race::Tecklan:
    {
        printf("Your are very strong.\n");
    }
    break;
    case Race::Ivyn:
    {
        printf("You are a great leader.\n");
    }
    break;
    case Race::Moiran:
    {
        printf("Anything you want.\n");
    }
    break;
    default:
    {
        printf("ERROR: Unkown race.\n");
    }
    break;
    }

    return 0;
}
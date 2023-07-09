#include <cstdio>

int step_function(int x)
{
    int result = 0;

    if (x > 0)
    {
        result = 1;
    }
    else if (x < 0)
    {
        result = -1;
    }
    else
    {
        result = 0;
    }

    return result;
}

int main()
{
    int valueOne = step_function(5);
    int valueTwo = step_function(-432);
    int valueThree = step_function(0);

    printf("The values are: %d, %d and %d\n", valueOne, valueTwo, valueThree);

    return 0;
}

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
    int num1 = 41;
    int result1 = step_function(num1);

    int num2 = 0;
    int result2 = step_function(num2);

    int num3 = -32767;
    int result3 = step_function(num3);

    printf("Num1: %d, Step1: %d\n", num1, result1);
    printf("Num2: %d, Step2: %d\n", num2, result2);
    printf("Num3: %d, Step3: %d\n", num3, result3);

    return 0;
}
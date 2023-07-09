#include <cstdio>

int absolute_value(int x)
{
    if (x >= 0)
        return x;
    else
        return x * -1;
}

int main()
{
    int num1 = 445;
    int result1 = absolute_value(num1);

    int num2 = 0;
    int result2 = absolute_value(num2);

    int num3 = -454;
    int result3 = absolute_value(num3);

    printf("Num1: %d. Absolute Value: %d\n", num1, result1);
    printf("Num2: %d. Absolute Value: %d\n", num2, result2);
    printf("Num3: %d. Absolute Value: %d\n", num3, result3);
}
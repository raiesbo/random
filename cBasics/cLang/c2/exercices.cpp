#include <cstdio>

enum class Operation
{
    Add,
    Substract,
    Multiply,
    Divide
};

class Calculator
{
    Operation ops;

public:
    Calculator(Operation op)
    {
        ops = op;
    };

    int calculate(int x, int y)
    {
        switch (ops)
        {
        case Operation::Add:
        {
            return x + y;
        }
        break;
        case Operation::Substract:
        {
            return x - y;
        }
        break;
        case Operation::Multiply:
        {
            return x * y;
        }
        break;
        case Operation::Divide:
        {
            return x / y;
        }
        break;
        default:
            return 0;
            break;
        };
    }
};

int main()
{
    Calculator calculator{Operation::Multiply};
    int result = calculator.calculate(2, 5);
    printf("Result: %d\n", result);

    return result;
}
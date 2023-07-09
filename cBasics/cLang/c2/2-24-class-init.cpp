#include <cstdio>

class PodStruct
{
public:
    u_int64_t a;
    char b[256];
    bool c;
};

int main()
{
    PodStruct initialized_pod1{};    // No fields set
    PodStruct initialized_pod2 = {}; // No fields set

    PodStruct initialized_pod3{42, "hello"};       // Two first fields set
    PodStruct initialized_pod4{42, "hello", true}; // All fields set

    return 0;
}
#include <cstdio>

int main()
{
    double an = 6.0221409e23;
    printf("Avogadro's Number: %le %lf %lg\n", an, an, an); // Avogadro's Number: 6.022141e+23 602214090000000006225920.000000 6.02214e+23

    float hp = 9.49843;
    printf("Hogwards's Platform: %e %g %g\n", hp, hp, hp); // Hogwards's Platform: 9.498430e+00 9.49843 9.49843

    return 0;
}
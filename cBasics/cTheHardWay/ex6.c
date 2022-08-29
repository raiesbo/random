// if-statement
/*
if (TEST) {
    CODE;
} else if (TEST) {
    CODE;
} else {
    CODE;
}
*/

// switch-statement
/*
switch (OPERAND) {
    case  CONSTANT:
        CODE;
        break;
    default:
        CODE;
}
*/

// while-loop
/*
while (TEST) {
    CODE;
}
*/

// while-continue-loop
/*
while (TEST) {
    if (OTHER_TEST) {
        continue;
    }
    CODE;
}
*/

// while-break-loop
/*
while (TEST) {
    if (OTHER_TEST) {
        break;
    }
    CODE;
}
*/

// do-while-loop
/*
do {
    CODE;
} while (TEST);
*/

// for-loop
/*
for (INIT; TEST; POST) {
    CODE;
}
*/

// enum
/*
enum { CONST1, CONST2, CONST3 } NAME;
*/

// goto
/*
if (ERROR_TEST) {
    goto fail;
}

fail:
    CODE;
*/

// function
/*
TYPE NAME (ARG1, ARG2, ...) {
    CODE;
    return VALUE;
}
*/

// typedef
/*
typedef DEFINITION IDENTIFIER;
*/

// struct
/*
struct NAME {
    ELEMENTS;
} [VARIABLE_NAME];
*/

// union
/*
union NAME {
    ELEMENTS;
} [VARIABLE_NAME];
*/

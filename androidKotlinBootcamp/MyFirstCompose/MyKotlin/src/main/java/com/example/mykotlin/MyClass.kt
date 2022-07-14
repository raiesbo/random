package com.example.mykotlin

fun main() {
    // typesTest()
    // conditionlsTest()
    // loopsTest()
    // functionsTests()
    collections()
}

fun typesTest() {
    var name = "Vicent" // var => Mutable
    val myName = "Joan" // val => Immutable // Constant

    println("Hello $name")
    name = "Kotlin"
    println(name)
    println(myName)

    val myShort: Short
    val myByte: Byte

    myShort = 32767
    myByte = 127

    println("My age is between $myByte and $myShort years old!")


    // Operations
    val a = 23
    val b = 30

    println(a - b)
    println(a + b)
    println(a / b) // Result: 0 // When dividing integers we do not get the right result.
    println(a * b)

    val c = 23.0
    val d = 30.0
    println(c / d) // Result: 0.7666666666666667

    val e = 10
    val f = 3
    val g = 2
    println(e % f) // Result: 1 // Reminder
    println(e % g) // Result: 0
}

fun conditionlsTest() {

    val amount =  900

    /*
    if (amount === 1000) {
        println("You are wealthy")
    } else if (amount >= 1000) {
        println("Wow... you are very wealthy")
    } else {
        println("Your are getting by")
    }
    */
    when(amount) {
        in 1..100 -> println("this amount is between 1 and 100")
        125 -> println("You are getting there")
        999 -> println("Really close")
        1000 -> println("Rich, but not there yet")
        1100 -> println("You made it!")
        else -> {
            println("$amount is not going to work")
        }
    }
}

fun loopsTest() {
    for (i in 1..1000) {
        if (i % 3 == 0) println("$i is multiple of 3") else println("---")
    }
}

fun functionsTests() {
    // Passing arguments
    fun calculate(
        first: Int = 1,
        second: Int = 100,
        multipleOf: Int,
        message: String = "..."
    ) {
        for (i in first..second) {
            if (i % multipleOf == 0) {
                println("$i $message $multipleOf")
            }
        }
        println("This is a function")
    }

    // calculate(10, 1000, 11, "is multiple of...")
    // Call with named parameters
    // calculate(message = "troco turu", second = 100, multipleOf = 11)

    fun calculateCatAge(age: Int): Int {
        return age * 7
    }

    /*println(
        calculateCatAge(2) // Result: 14
    )*/

    //Short function version
    fun simplifiedFunc(age: Int): Int = age * 7

    /*println(
        simplifiedFunc(7) // Result: 49
    )*/

    // Lambda expressions
    val sum: (Int, Int) -> Int = {a, b -> a + b}

    // println(sum(1, 2)) // 3

    // CHALLENGE LAMBDA EXPRESSIONS
    val calcCatAge: (Int) -> Int = {it * 7}
    // The "it" keyword is only available with single parameter lambdas

    // println(calcCatAge(10)) // 70

    // Functions that return nothing // Unit = Void
    val name: (String) -> Unit = {print("Hello $it")}
    // name("Johnny")

    // Passing functions as parameters
    fun enhancedMessage(message: String, funAsParameter: () -> Int) {
        println("$message ${funAsParameter()}")
    }
    // Since the LAST parameter is a function, we can pass it as following
    enhancedMessage(
        message = "Hello there"
    ) {
        sum(24, 12)
    }
}

fun collections() {
    val myListOfNames = listOf( "James", "Paul", "Rafael", "Gina" ) // Stored as Array
    // println(myListOfNames)

    // myListOfNames.forEach { println("Lambda tests: $it") }

    // for (item in myListOfNames) {
    //     println("Name: $item")
    // }

    val myMutableList = mutableListOf(1, 5, 3, 10)
    myMutableList.add(25)
    // println(myMutableList)
    myMutableList.add(1,30)
    // println(myMutableList)
    myMutableList.remove(5)
    // println(myMutableList)
    myMutableList.removeAt(0)
    // println(myMutableList)

    // SET // Collection of unic elements
    val mySet = setOf("US", "MZ", "AU", "US")
    // println(mySet) // [US, MZ, AU]

    val myMutableSet = mutableSetOf(1, 2, 3, 4)
    myMutableSet.add(5)
    // println(myMutableSet) // Result [1, 2, 3, 4, 5]
    myMutableSet.add(5)
    // println(myMutableSet) // Result [1, 2, 3, 4, 5] //Does not add a second 5 since it is a "set"

    // MAP // Hash tables
    val secretMap = mutableMapOf(
        "a" to "hi",
        "b" to myMutableSet
    )

    if ("a" in secretMap) println(secretMap["b"])
    if ("hi" in secretMap.values) println("Yes is in!")

    secretMap["c"] = "put data" // The same as secretMap.put("c", "put data")

    println(secretMap)
}


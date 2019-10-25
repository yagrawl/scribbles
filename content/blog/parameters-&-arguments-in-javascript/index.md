---
title: Parameters & Arguments in Javascript
date: "2017-08-23T22:12:03.284Z"
time: "5 mins"
description: Is a parameter and an argument one and the same?
---

Javascript is a functional language meaning that functions are the primary
modular units of execution. Functions are obviously very important in
Javascript. When talking about functions, the terms parameters and arguments
are often interchangeably used as if it were one and the same thing but there
is a very subtle difference.

-   Parameters are variables listed as a part of the function definition.
-   Arguments are values passed to the function when it is invoked.

Why should we bother about this minute difference?

Well for starters, JavaScript does not throw an error if the number of
arguments passed during a function invocation are different than the number of
parameters listed during function definition. This should make it clear that
parameters and arguments should be treated as two different entities.

```js
// Basic function with three parameters that logs the sum of all the parameters
function argCheck(parameter1, parameter2, parameter3){
  console.log(parameter1 + parameter2 + parameter3);
}

// Function with extra arguments
argCheck(1,2,3,4);
// Logs 6 (1 + 2 + 3, ignores 4)

// Function with missing arguments
argCheck(1,2);
// Logs NaN because by default if a corresponding argument is missing, it is set to undefined.
// parameter3 is assigned undefined and so 1+2+undefined = NaN

// Note that, no error is thrown
```

In the code snippet above the function `argCheck` takes three parameters
according to its function definition. On line 7 we call the function with an
extra argument and the code executes without any errors.

Similarly on line 11 we invoke the function with an argument less as compared
to the number of parameters and it still does not throw any error. Hopefully
this has convinced you that there is more to `arguments` and `parameters` and
this article would discuss some features JavaScript provides in this context.

Basically, when excess arguments are provided, they don’t get assigned to any
parameters. There are ways to access these excess assignments which we will
get to in a bit. On the other hand if we have more parameters than the
arguments, the parameters that have no corresponding arguments are set to
`undefined`. Lets explore JS features relating to arguments and parameters one
by one.

## The arguments parameter

No that is not a typo. The `arguments parameter` is implicitly passed just like
the `this` parameter. It is a local variable accessible within all functions
and contains an entry for each `argument` passed to that function. The
arguments object is an array-like construct which can be used to access
arguments passed to the function even if a matching parameter isn’t explicitly
defined.

```js
function argumentVar(parameter1, parameter2, parameter3){
  console.log(arguments.length); // Logs the number of arguments passed.
  console.log(arguments[3]); // Logs the 4th argument. Follows array indexing notations.
}

argumentVar(1,2,3,4,5);
// Log would be as follows
// 5
// 4

// 5 is the number of arguments
```

See the code snippet above for the use of `arguments` object.
`arguments.length` indicates the exact number of arguments which does not
depend on the number of parameters in the function definition. Individual
arguments can be accessed using array-like indexing notation.

One interesting feature of the `arguments` object is that it aliases function
parameters in non strict mode. What this means is that changing `arguments[0]`
would change `parameter1`.

## Rest Parameters

Rest Parameter is an ES6 addition to JavaScript. To create a rest parameter
prefix the last parameter in a function definition with ellipsis(…).

```js
function restParam(...restArgs){
  console.log(restArgs.length); // Logs the number of arguments passed
  console.log(restArgs[3]); // Logs the 4th argument
}

restParam(1,2,3,4,5);
// Log would be as follows
// 5
// 4

// 5 is the number of arguments
// 4 is the 4th argument
```

In the code snippet above `...restArgs` creates an array `restArgs` that holds
all the arguments passed to the function in an array. The rest parameter has to
be the last parameter otherwise it throws a `Syntax error : parameter after
rest parameter`.

Two major differences between the `arguments` object and rest parameters:

-   Rest Parameters is a real array and methods like `forEach` and `sort` can be
    applied. Even though the `arguments` object has the `length` method, it is not
    a real array and using array methods like `sort` would only bring us misery and
    sorrow.

-   Rest Parameters contain only the `arguments` that have no corresponding
    parameter while arguments object contains all the arguments passed to the
    function. Code snippet #3 could also be written as follows.

```js
function restParam(parameter1, ...restArgs){
  console.log(restArgs.length); // Logs the number of arguments that do not have a corresponding parameter
  console.log(restArgs[2]); // Logs the 3rd argument after the number of arguments that do not have a corresponding parameter
}

restParam(1,2,3,4,5);
// Log would be as follows
// 4
// 4

// 4 is the number of arguments that do not have a corresponding parameter
// 4 is the 4th 3rd argument after the number of arguments that do not have a corresponding parameter
```

Hopefully the article provided some information on arguments and parameters and
why it is important to differentiate between the two.

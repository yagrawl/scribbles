---
title: Defining Functions in Javascript
date: "2019-09-03T22:12:03.284Z"
time: "5 mins"
description: Different types of function definitions in Javascript and their consequences
---

Generally, a function is a sequence of instructions or a 'subprogram' that can be invoked by the code that is external (or internal) to that function. In essence, functions 'encapsulate' a particular task.

Functions are one of the fundamental building blocks in JavaScript and _really_ understanding functions can help tackle some of the JavaScript oddities.

## Functions in Javascript

An important thing to note about functions in JavaScript is that they are
_first-class objects_. This basically means that functions in JavaScript can be treated like any other JavaScript object and can be referenced as other variables or passed as arguments to a function. Functions can even have properties and other methods just like any other JavaScript object. The key difference between a function and other objects is that a function can be called.

Every function in JavaScript is a `Function` object. You can go into the console and try this out.

```javascript
function typeCheck() {};
typeCheck instanceof Function // True
```

`Function` object has a few specific methods and properties like `apply`, `call`, `bind`, `isGenerator`, etc. that are not available on other Objects.

There are a few different ways in which a function can be defined in JavaScript and the way it is defined affects function behavior. Let's explore each way one by one.

### Function Declaration

This might be the most familiar way of defining a function. A function declaration consists of a name preceded by the mandatory `function` keyword and followed by an optional list of parameters inside a required pair of parenthesis `( )`.

```javascript
function sum(param1, param2) {
  return param1 + param2;
}
```

Two main things to be noted about this form of defining a function are:

-   A variable which holds the function object is created in the current scope with the same identifier as the function name provided. In our example, `sum`.

-   The variable is **hoisted** to the top of the current scope. You can read more on that [here](https://www.yagrawal.com/hoisting-in-javascript).

To bring the second point home, lets look at an example :

```javascript
console.log(notYetDeclared()); // Logs 'Here!'

function notYetDeclared() {
  return 'Here';
}
```

We were able to invoke the function `notYetDeclared` before we defined it.

### Function Expression

A function expression is very similar in syntax to a function declaration. The major difference is that a function expression does not need a function name.

```javascript
let sum = function(param1, param2) {
  return param1 + param2;
};
```

Function expressions are a part of another statement. In the example above, the function expression is part of the `sum` variable assignment.

Unlike function declaration, function expressions are _not_ **hoisted**.

```javascript
console.log(notYetDeclared); // Logs 'undefined'

let notYetDeclared = function() {
  return 'Here';
}
```

An interesting use-case of Function Expressions is the ability to create IIFEs or Immediately Invoked Function Expressions. There are instances where we might want to define a function and invoke it right after the definition and never again. Sure, it can be done with function declaration but to make it more readable and to make sure that our program doesn't accidentally access it, we use an IIFE.

Consider this example,

```javascript
function callImmediately(foo) {
  console.log(foo);
}

callImmediately('foo'); // Logs 'foo'
```

We create a function called `callImmediately` which takes an argument and logs it and then we immediately call it. This same result can be achieved by doing this.

```javascript
(function(foo) {
  console.log(foo);
})('foo'); // Logs 'foo'
```

The key difference is that in the first case, the function declaration pollutes the global namespace and the named function `callImmediately` hangs around long after it is required. The IIFE is anonymous and hence cannot be called in the future.

### Arrow Functions

Arrow functions are an ES6 addition and are meant as a syntactically compact alternative to Function Expressions. Arrow functions are defined using a pair of parenthesis containing a list of parameters, followed by a fat arrow `=>` and then the function statements with curly braces `{}`.

```javascript
let sum = (param1, param2) => {
  return param1 + param2;
};
```

Since one of the main motivations behind the arrow function is syntax compactness, if the only statement in the arrow function is `return` we can remove both the curly braces and the `return` keyword, like so :

```javascript
let sum = (param1, param2) => param1 + param2;
```

Also the parens can be eliminated if we have only one parameter being passed to the arrow function.

```javascript
let double = param1 => param1 * 2;
```

Some important things to note in this form of function definition are :

-   An arrow function does not have its own `this` and it uses the `this` value of the enclosing lexical scope.

    ```javascript
    let foo = {
      id: 10,
      logIdArrow: () => { console.log(this.id) },
      logIdExpression: function() {
        console.log(this.id);
      }
    }

    foo.logIdArrow(); // Logs 'undefined'
    foo.logIdExpression(); // Logs '10'
    ```

    In the above example, we have an arrow function and a function expression that logs `foo.id` using `this`.

-   An arrow function does not have the `prototype` property.

    ```javascript
    let foo = () => {};
    console.log(foo.prototype); // Logs 'undefined'
    ```

-   The `arguments` object is not available in an arrow function. You can read more about the `arguments` object [here](https://www.yagrawal.com/parameters-&-arguments-in-javascript).

### Function Constructor

As mentioned earlier, every function in JavaScript is a `Function` object so to define a function we can also directly call the constructor of the `Function` object.

```javascript
let sum = new Function('param1', 'param2', 'return param1 + param2');
```

The arguments are passed as a list of comma separated strings `'param1', 'param2', ..., 'paramN'` and the last argument is the function body passed in as a string.   

Performance wise, this way of defining a function is less efficient than function declaration or function expression. Functions defined using Function constructor are parsed each time the constructor is called because the function body string needs to be parsed each time unlike others which are parsed with the rest of the code.  

One use-case of defining functions this way is to access the `global` object in node or the `window` object in the browser. These functions are always created in the global scope and do not have access to the current scope.

### Generator Function

Generators are an ES6 addition. Generators are special types of functions in the sense that unlike a traditional function, generators produce multiple values on a per request basis while suspending their execution between these requests.

```javascript
function* idMaker() {
  let index = 0;
  while(true)
    yield index++;
}

let gen = idMaker();

console.log(gen.next().value); // Logs 0
console.log(gen.next().value); // Logs 1
console.log(gen.next().value); // Logs 2
```

The `function*` and `yield` keywords are unique to a generator. Generators are defined by adding an `*` at the end of a function keyword. This enables us to use the `yield` keyword within the body of the generator to produce values on request.

You can read it in more detail [here](https://www.yagrawal.com/generators-in-javascript).

## Conclusion

The choice of which definition type to use is dependent on the situation and what you are trying to achieve. A few general pointers to keep in mind:

-   If you want to leverage function hoisting use function declarations - for example in situations where you want to move the function implementation details to the bottom and just the abstracted flow on top for clarity.

-   Arrow functions are well suited for short callback functions and more importantly, when the desired `this` is the enclosing function.

-   Avoid using the Function constructor to define functions. If the annoying syntax wasn't enough to keep you away, it could potentially be a risk from a security standpoint.

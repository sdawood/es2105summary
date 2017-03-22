/**
 * 1- In ES5, you declare variables via var. Such variables are function-scoped, their scopes are the innermost enclosing functions.
 * 2- Undeclared variables are always global - except for 'strict mode'
 * 3- declaration is hoisted to the top of the enclosing scope
 */

var x = 3
function func1(randomize) {
    if (randomize) {
        var x = Math.random(); // (A) scope: whole function
        return x
    }
    return x // accesses the x from line A
}
console.log(func1(false)) // undefined

let y = 3
function func2(randomize) {
    if (randomize) {
        let y = Math.random()
        return y
    }
    return y
}
console.log(func2(false)) // undefined


// TDZ

let tmp = true;
if (true) { // enter new scope, TDZ starts
    // Uninitialized binding for `tmp` is created
    console.log('Whoops, no ReferenceError!!!', tmp); // ReferenceError
    // That is because of babel transpiling let x to var _x inside the inner scope --> check transpiled code

    let tmp; // TDZ ends, `tmp` is initialized with `undefined`
    console.log(tmp); // undefined

    tmp = 123;
    console.log(tmp); // 123
}
console.log(tmp); // true

/**
* More about TDZ (Temporal Dead Zone) scope for let and const
* http://exploringjs.com/es6/ch_variables.html#_examples
**/

const cons = 1;
// must initialize upon declaration
// can't re-assign cons
// cons = 2

const obj = {}
obj.x = 'not really immutable'
obj.nested = {}
console.log(obj)

const frozen = Object.freeze(obj)
// freeze is shallow
try {
    frozen.y = 'IGNORED'
} catch(err) {
    console.log(err)
}
frozen.nested.y = 'only shallow attributes are frozen'
console.log(frozen)






function func(x, y=0) {
    return [x, y];
}
console.log(func(1, 2)) // [1, 2]
console.log(func(1)); // [1, 0]
console.log(func()); // [undefined, 0]

const func_ = (x, y=0) => {
    return [x, y];
}
console.log(func_(1, 2)) // [1, 2]
console.log(func_(1)); // [1, 0]
console.log(func_()); // [undefined, 0]


// Rest params

function format(pattern, ...params) {
    return {pattern, params};
}
console.log(format(1, 2, 3));
// { pattern: 1, params: [ 2, 3 ] }
console.log(format());
// { pattern: undefined, params: [] }

/*
 * Named parameters via destructuring
 * You can simulate named parameters if you destructure with an object pattern in the parameter list
 */

const params = {param1: 'value1', param2: 'value2', param3: 'value3'}
function funcWithNamedParams({param1, param2, param3}) {
    return [param1, param2, param3]
}

console.log('funcWithNamedParams', funcWithNamedParams(params))
// VS, expanded result array
console.log('funcWithNamedParams', ...funcWithNamedParams(params))

// as in object destructuring, default values and computed defaults based on PREVIOUS key's value is allowed

function funcWithNamedParamsPlus({param1, param2, param3, paramDependant=(val => `${val}-dependent`)(param1), paramExtra='paramExtraDefaultValue'}) {
    return [param1, param2, param3, paramDependant, paramExtra]
}

console.log(funcWithNamedParamsPlus(params))

// named params are object destructuring, thus ...

try {
    funcWithNamedParams()
} catch(err) {
    console.log(err.message) // Cannot read property 'param1' of undefined
}

// To work around that, the whole params object can have a default value

function funcWithNamedParams2({param1, param2, param3, paramExtra='paramExtraDefaultValue'} = {}) {
    return [param1, param2, param3, paramExtra]
}
console.log(funcWithNamedParams2()) // [ undefined, undefined, undefined, 'paramExtraDefaultValue' ]
console.log(funcWithNamedParams2(params)) // [ 'value1', 'value2', 'value3', 'paramExtraDefaultValue' ]

// or by using neat object spread operator
console.log(funcWithNamedParams2({...params, paramExtra: 'PARAM_EXTRA_VALUE'})) // [ 'value1', 'value2', 'value3', 'PARAM_EXTRA_VALUE' ]

// no need to use the `arguments` object
// ECMAScript 5: arguments
function logAllArguments1() {
    for (var i=0; i < arguments.length; i++) {
        console.log(arguments[i]);
    }
}

logAllArguments1(1, 2, 3, 4)
// ECMAScript 6: rest parameter
function logAllArguments2(...args) {
    args.map(x => console.log(x))
}
logAllArguments2(10, 20, 30, 40)

// worth mentioning that in es2015+ `arguments` is is iterable, which means, can be used with for-of loops and easily converted to an array using the `...` operator
function logAllArguments3() {
    for(const i of arguments) {
        console.log(i)
    }
    // or
    console.log(...arguments)
    // or
}
logAllArguments3(100, 200, 300, 400)

// example: (ab)using the default arguments
const mandatory = (type='Any') => { throw Error(`Missing argument of type: ${type}`) }
function withValidation({first=mandatory('String'), last=mandatory('String'), age=mandatory('Integer')}) {
    return [first, last, age]
}
try {
    const user = {first: 'John', last: 'Smith'}
    withValidation(user)
} catch(err) {
    console.log(err.message)
}

// While not recommended as a convention, you still can go crazy with a mix of positional and `simulated` named params
function mixingNamedWithPositional(x, {first, last, location='UNKNOWN'}, action, timeOut=5000) {
    console.log(x, first, last, location, action, timeOut)
}

const user = {first: 'John', last: 'Smith'}
mixingNamedWithPositional(1000, user, 'DELETE')

// one common style is to adopt the python-like order of having posititial params (*args) followed by named params (**kwargs)
// it is always recommended though that if your function receives for example an options object,
// that you expand the mandatory attributes as named params for a self-documenting code

function withOptionsAndData({option1, option2='DEFAULT_OPTION_2', option3='DEFAULT_OPTION_3'}, data) {
    console.log(option1, option2, option3, data)
}

const options = { option1: 'OPTION1', option3: 'OPTION3' }
const data = {somekey: 'SOME_DATA'}

try {


    withOptionsAndData(options, data)
} catch(err) {
    console.log('Error:', err.message)
}

// one more time, that is becuase the above object destructuring is equivalent to ...
function withOptionsAndDataExplained(options, data) {
    const {option1: option1, option2: option2='DEFAULT_OPTION_2', option3: option3='DEFAULT_OPTION_3'} = options
    console.log(option1, option2, option3, data)
}
withOptionsAndDataExplained(options, data)

// one more time, don't forget that using the expanded syntax, you have a chance to choose a different value for your variable name other than the key value
// remember, you always have a chance to specify default values
// back to the arrow function style while on it


const withOptionsRenamed = ({option1: host, option2: port=8000, option3: homePage}) => {
    console.log(host, port, homePage)
    // remember that reconstructing the object is super easy
    return {host, port, homePage}
}
withOptionsRenamed(options)

const usedAndUnusedOptions = ({option1: host, option2: port=8000, ...unusedOptions}) => {
    console.log(host, port, unusedOptions)
    return {host, port, ...unusedOptions}
}
console.log(usedAndUnusedOptions(options))




/**
 *
 * Destructuring can be used in the following locations (I’m showing Array patterns to demonstrate; object patterns work just as well):

 // Variable declarations:
 const [x] = ['a'];
 let [x] = ['a'];
 var [x] = ['a'];

 // Assignments:
 [x] = ['a'];

 // Parameter definitions:
 function f([x]) { ··· }
 f(['a']);
 You can also destructure in a for-of loop:

 const arr = ['a', 'b'];
 for (const [index, element] of arr.entries()) {
    console.log(index, element);
}
 // Output:
 // 0 a
 // 1 b

 */
const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

let [x, y] = list;
console.log(x, y);

[x, , y] = list;
console.log(x, y);

let v
[x, , v, , y] = list;
console.log(x, v, y);

[x, ...y] = list;
console.log(x, y);

[x, , , ...y] = list
console.log(x, y)

let [firstChar, ...restString] = 'Hello World'
console.log(firstChar, restString)

const helloWorldFoo = () => 'John Smith'.split(' ');
let [first, last] = helloWorldFoo();
console.log(first, last);

[x] = { * [Symbol.iterator]() { yield 'value from iterator' } }
console.log(x); // <--- another example of MANDATORY semicolon

// default values

[x, y=1000] = [10];
console.log(x, y);

[x=1000, y=1000000] = [];
console.log(x, y);

// reference other `names` in the pattern
const [x_=1000, y_=x_*2] = []
console.log(x_, y_)

// Complex Default Values
const [v_, { inner: inner_ } = {inner: 1000}] = [10]
console.log(v_, inner_)

// and finally swap values like a boss, with no intermediate variables
let a = 'A', z = 'Z';
console.log(a, z);
[a, z] = [z, a];
console.log(a, z);

// Rest (spread) Operator

[x, y, ...z] = ['a']; // x='a'; y=undefined; z=[]
console.log(x, y, z);

// the rest operator can be applied to a pattern too

[x, ...[y, z]] = ['a', 'b', 'c'];

/**
 * ^^^
 * The rest operator triggers the following destructuring: [y, z] = ['b', 'c']
 */

// make a copy of the source array before manipulation
const sourceList = [1, 2, 3, 4, 'DON NOT CHANGE ME']
const targetList = [...sourceList]
targetList.pop()
console.log(sourceList, targetList)

// or do more cool stuff while copying

const commands = ['ITEM1', 'ITEM2', 'ITEM2']
const decorated = ['<ul>', ...commands.map(c => `  <li>${c}</li>`), '</ul>']
console.log(decorated.join('\n'))


/**
 * Object De-Structuring
 */

console.log('*** OBJECT DE-STRUCTUREING ***');

let {length: len} = list
console.log('length:', len)

const obj = { first: 'Jane', last: 'Doe' }

// es5
// first = obj.first
last = obj.last

console.log(first, last); // <--- this semicolon is MANDATORY, believe it or not, try removing it :)


// naiive approach
// {first: first, last: last} = obj // <--- CONFUSES Js interpreter

({first: first, last: last} = obj)

console.log(first, last);

// {prop} is short for {prop: prop}
({first, last} = obj);
// first = 'Jane'; last = 'Doe'
console.log(first, last);

// destructure + rename
const {first: firstName, last: lastName} = obj;
// firstName = 'Jane'; lastaName = 'Doe'
console.log(firstName, lastName);

let middle;

({first, middle: middle='DEFAULT_MIDDLE_NAME', last} = obj);
console.log(first, middle, last);

// default value is only evaluated as needed, i.e. Lazy evaluated
const generateDefault = (val) => { console.log('Generating Default'); return `DEFAULT_${val}_NAME`};

({first=generateDefault('first'), middle=generateDefault('middle'), last=generateDefault('last')} = obj);
console.log(first, middle, last);

const contactInfo = { user: { address: { home: { city: 'Melbourne', street: 'Yarra Avenue'} } } }

let {user: {address: {home: {city, street}}}} = contactInfo;
console.log(city, street);

// rename and default
const lookupZipCode = (city, street) => `FAKE_ZIP_${city}_${street.replace(' ', '_')}`
let zip;
// VVV again, since it is not a declaration, parenthesis are MANDATORY for parser satisfaction
({user: {address: {home: {city, street, zipCode: zip=lookupZipCode(city, street)}}}} = contactInfo);
console.log(city, street, zip); // NOTICE the variable name is zip not zipCode

const COMPUTED_KEY = 'SOME_KEY'
let { [COMPUTED_KEY]: computedKeyValue} = { SOME_KEY: 'value of a computed key' }
console.log(computedKeyValue)

const getDependencyName = () => 'SOME_DEPENDENCY_v0';
({ [getDependencyName()]: computedKeyValue} = { SOME_DEPENDENCY_v0: 'another value of a computed key'})
console.log(computedKeyValue)

// assign into anything

let shippingAddress = {}, streets= [];
({user: {address: {home: {city: shippingAddress.toCity, street: streets[0]}}}} = contactInfo);
console.log(shippingAddress, streets);

// a hint of iterator protocol
const iter = [1, 2, 3, 4, 5][Symbol.iterator]();
console.log(iter.next());
let {value, done} = iter.next();
console.log(value, done);
console.log([...iter]);

// a hint of For-of, Map, Set


let iterable = new Map([['a', 1], ['b', 2], ['c', 3]]);
for (let entry of iterable) {
    console.log(entry);
}

// entry is asking for destructuring

for (let [key, value] of iterable) {
    console.log(`key: ${key}, value: ${value}`);
}

// destructuring makes working with objects in an immutable fashion a breeze, promoting pure functions

const source = {value: 'VALUE', anotherValue: 'ANOTHER_VALUE'}

// create a copy of the object
const dest = {...source}
console.log(dest)

const modified = {...source, value: 'MODIFIED_VALUE'}
console.log(modified)

const modifiedFail = {value: 'MODIFIED_FAIL', ...source}
console.log(modifiedFail)

const source2 = {value2: 'VALUE2'}
const concatObj = {...source, ...source2}
console.log(concatObj)

// or using more explicit Object.assign()

const extended = Object.assign(source, {extended1: 'EXTENDED_VALUE1'}, {extended2: 'EXTENDED_VALUE2'})
console.log(extended)

// mixing it all together

const sources = [{resource1: 'resource1Val'}, {resource2: 'resource2Val'}, {resource3: 'resource3Val'}, {resourceWithAVeryLongName: 'resourceWithAVeryLongNameVal'}]
const combined = Object.assign({}, ...sources)

console.log(combined)

// default values, vars with same name as keys, rename a long named key
const {commonValue='DEFAULT_COMMON', resource1, resource2, resource3, resourceWithAVeryLongName: resource4} = combined

console.log(commonValue, resource1, resource2, resource3, resource4)

const options = {
    option1: 'OPTION_1',
    option2: 'OPTION_2',
    option3: 'OPTION_3',
    option4: 'OPTION_4'
}

// And YES, you can use spread/rest operator for assignment destructing, oh, yes you can
const {option1, option2, ...unused} = options
console.log(option1, option2, unused)


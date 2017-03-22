const oldObj = {
    foo: function(name) { console.log('hello' + name) }
}

oldObj.foo('es5')

// new method shorthand

const es6Obj = {
    foo (name) { console.log(`Hello es2015 NOT ${name}`)}
}
es6Obj.foo('es6')

// computed property key, also method names

const ENVIRONMENT = 'Staging'
const Lambda = {
    [`CoolLambda${ENVIRONMENT}`]() {
        console.log('Inside CoolLambdaStaging')
    },
    [ENVIRONMENT]: 'arn:blah:blah'
}
Lambda.CoolLambdaStaging()
console.log(Lambda.Staging)

// new methods in Object

const source1 = {x: 'X', y: 'Y'}
const dest1 = {z: 'Z'}
Object.assign(dest1, source1)
console.log(dest1)

const source2 = {y: 'OVERWRITE_Y_2'}
const source3 = {y: 'OVERWRITE_Y_3'}
Object.assign(dest1, source2, source3)
console.log(dest1)

// order matters, deltas apply left to write, last object wins
Object.assign(dest1, source3, source2)
console.log(dest1)

// doing the same with style

const dest2 = {...source1, ...source2, ...source3}
console.log(dest2)

// Both Object.assign and spread operators are shallow copying the iterator, what? ... let's see

const deepRef = {name: 'deepRefOriginal'}
const deepSource = {shallow: 'SHALLOW', deep: deepRef}
const copy1 = Object.assign({}, deepSource)
copy1.deep.name = 'SOMETHING_ELSE_ASSIGNED'
console.log('copy1:', copy1)
console.log('deepSource:', deepSource)

// what a sad sad day, all is lost, all is lost

const copy2 = {...deepSource}
copy2.deep.extra = 'EXTRA_PROP'
console.log('copy2', copy2)
console.log('deepsource', deepSource)

// also there are lots of edge cases if you try to copy methods, property descriptors, specially ones calling super(), just use for simple data objects

// Object.is ... only useful for NaN and +/-0
console.log(NaN === NaN)
console.log(+0 === -0)

const resultsWithNaN = [0, 1, 2, NaN, 3, 4]
console.log(resultsWithNaN.indexOf(NaN))
console.log(resultsWithNaN.findIndex(x => Object.is(x, NaN)))





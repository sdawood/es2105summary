import {log} from './util/logger'

const arr = ['a', 'b', 'c']
let arrIter = arr[Symbol.iterator]()
log(arrIter.next())
log(arrIter.next())
log(arrIter.next())
log(arrIter.next())

// once your consume an iterator, it can't be re-started, it is like a none-rewindable cassette tape

// manual iteration if you can grab an `fresh` iterator
arrIter = arr[Symbol.iterator]()
let next = arrIter.next()
while(!next.done) {
    log(next.value)
    next = arrIter.next()
}

// new for-of loop for iterables, it grabs a fresh iterator implicitly

for (const v of arr) {
    log(v)
}

// or the handy spread operator

log([...arr]) // spreads an iterable, too obvious in the array case, but we just `see` the object as type `iterable`, more to come
log([...arr[Symbol.iterator]()]) // or unfold an iterator, since native iterators are iterable too, i.e. has [Symbol.iterator]() that returns this

// let's make an iterator
// objects are not iterable by default, this function returns an iterator (which is iterable itself) of object entries

function objectEntries(obj) {
    let index = 0;

    // In ES6, you can use strings or symbols as property keys,
    // Reflect.ownKeys() retrieves both
    const propKeys = Reflect.ownKeys(obj);

    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            if (index < propKeys.length) {
                const key = propKeys[index];
                index++;
                return { value: [key, obj[key]], done: false };
                // return { value: [key, obj[key]] }; // shorthand
            } else {
                return { value: undefined, done: true };
                // return { done: true }; // shorthand
            }
        }
    };
}

const contactInfo = { first: 'John', last: 'Smith', address: 'Something St, Somewhere, SomeCity'}

// manually
const iterator = objectEntries(contactInfo)
log(...iterator)

// for-of
for (const [key, value] of objectEntries(contactInfo)) {
    log(key, value)
}

// or better
log(...objectEntries(contactInfo))

// Finally a useful example

function take(n, iterable) {
    const iterator = iterable[Symbol.iterator]()
    return {
        [Symbol.iterator]() {
            return this
        },
        next() {
            if (n > 0) {
                n --
                return iterator.next()
            } else {
                return { done: true }
            }
        }
    }
}

const veryLongList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
log([...take(3, veryLongList)])

function skip_(n, iterable) {
    const iterator = iterable[Symbol.iterator]()
    return {
        [Symbol.iterator]() {
            return this
        },
        next() {
            if (n > 0) {
                n --
                iterator.next()
                return {} // effectively { value: undefined, done: false }
            } else {
                return iterator.next()
            }
        }
    }
}

function skip(n, iterable) {
    return [...skip_(n, iterable)].filter(v => v !== undefined)
}

log(...skip(5, veryLongList))

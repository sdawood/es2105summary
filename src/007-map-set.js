// consistent .has, .delete
import {log, error} from './util/logger'
import _ from 'lodash'

const map1 = new Map()
map1.set(1, 'ONE') // int keys
map1.set('2', 'TWO') // string keys
const three = {'3': 3}
map1.set(three, 'THREE') // object keys
map1.set(NaN, 'Not a Number')
map1.set(null, 'Null Reference')

log(map1)

log(map1.has(1))
log(map1.delete('2'))
log(map1.has('2'))
log(map1.has(three), map1.has({'3': 3})) // assume object === is used for key comparison, of course some hashing is going on under the hood
log(map1.has(NaN))
log(map1.has(null))

log(map1)

log(map1.get(1))
log(map1.get('2')) // undefined
log(map1.get(three))
log(map1.get(NaN))
log(map1.get(null)) // don't let the NaN

const entries = [[10, 'one'], [20, 'two'], [30, 'three'], [NaN, 'Definitely Not a Number']]
const map2 = new Map(entries)

// Map is iterable, so you can use for-of to iterate over keys

for (const key of map2.keys()) {
    log('Key: ', key)
}

// values

for (const value of map2.values()) {
    log('VALUE: ', value)
}

// or entries, with destructured assignment

for (const [key, value] of map2.entries()) {
    log(key, value)
}

// which is the same as ...

for (const [key, value] of map2) {
    log(key, value)
}

// you can also use the spread operator with Map, only because they provide `iterators` over keys, values and entries

log([...map2.keys()])
log([...map2.values()])
log([...map2.entries()])

// What about map and filter?

const mappedMap = new Map(
    [...map2]
        .map(([k, v]) => [k, `__${v}__`])
)
log('mappedMap:', mappedMap)

const filteredMap = new Map(
    [...map2]
        .filter(([k, v]) => Number.isFinite(k))
)
log('filteredMap:', filteredMap)

// if you combine maps using spread operator, for the same key, values to the right overwrite values to the left, just like Object.assign

const combinedMap = new Map([...map1, ...map2])
log('combinedMap:', combinedMap)

// Map has a .size attribute

log(`map1 size: ${map1.size}, map2 size: ${map2.size}, Combined Size: ${combinedMap.size}`)


// to JSONify a Map, you have two options

// either convert any map into an array of pairs
log(JSON.stringify([...combinedMap]))

// or, in case the keys are `strings` or convertable to strings, you can manually convert into an object
const mapWithStringKeys = new Map([['key1', 'value1'], ['key2', 'value2']])
const pojo = [...mapWithStringKeys].reduce(
    (acc, [k, v]) => {
        acc[k] = v
        return acc
    }
    , {})
log('POJO:', JSON.stringify(pojo))


// A WeakMap is a Map that doesn’t prevent its keys from being garbage-collected.
// That means that you can associate data with objects without having to worry about memory leaks.

const socket = { id: 'somerandomdata', state: 'connected' }
const sessionData = new WeakMap()

function onConnection(socket) {
    sessionData.set(socket, { startTime: Date.now() })
}

function getSessionData(socket) {
    return sessionData.get(socket)
}

onConnection(socket)
log(getSessionData(socket))

// WeakMap does not provide a way to enumerate keys, only code with a reference to the key-object can access the data

// Set is a set of unique values

const colors = new Set(['red', 'blue', 'yellow'])
colors.add('purple')
colors.add('red')
colors.add('purple')
colors.add('black')
log('Set size:', colors.size)
const purple = 'purple'
log(`Set has ${purple}: ${colors.has(purple)}`)
log(colors)

// Set is iterable, thus for-of loop can be used
for (const color of colors) {
    log(color)
}

// and same as before, the spread operator can expand an iterable into an array, allowing for map and filter, etc

log([...colors].map(color => color.toUpperCase()))
// Set can be cleared

colors.clear()
log(`Cleared, size: ${colors.size}`)

// to put it all together, Set is great to dedup a list

const duplicates = [1, 1, 1, 1, 2, 2, 3, 4, 5, 6, 1]
log([...new Set(duplicates)])

// Set doesn't do union, intersection and difference natively, but you can
const aSet = new Set([1, 2, 3])
const bSet = new Set([3, 4, 5])

const union = new Set([...aSet, ...bSet])
log('union', union)

const intersection = new Set(
    [...aSet].filter(elem => bSet.has(elem))
)
log('intersection', intersection)

const diffA = new Set(
    [...aSet].filter(elem => !bSet.has(elem))
)

log('diffA', diffA)

const diffB = new Set(
    [...bSet].filter(elem => !aSet.has(elem))
)

log('diffB', diffB)

// There is a WeakSet
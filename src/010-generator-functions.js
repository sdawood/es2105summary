import {log} from './util/logger'
/// (pieces of code) that you can pause and resume

function* idGen() {
    let id = 0
    while(true) {
        yield id++
    }
}

// a generator function is the simplest way to implement Iterable protocol and return an iterator

const idIterator = idGen()

log(idIterator.next())
log(idIterator.next())
log(idIterator.next())


// shorter take implementation

function* take(n, iterable) {
    const iterator = iterable[Symbol.iterator]()
    while (n > 0) {
        n --
        yield iterator.next().value
    }
}

log('take 10 IDs:', ...take(10, idGen()))

const [id1, id2, id3] = idGen()
log('take IDs via destructring', [id1, id2, id3])

// Exceptions work in a slightly different way, the iterator blows up on next

function* genBoom() {
    throw new Error('Boom on next!');
}
const iteratorBoom = genBoom();
try {
    iteratorBoom.next(); // Error: 'Boom on next!'
} catch (err) {
    log(err.message)
}

// recursive yield === yield*

const lines = ['line1', 'line2', 'line3']
const linesUpper = lines.map(l => l.toUpperCase())
function* content(lines) {
    yield 'HEADER'
    yield* lines
    yield 'FOOTER'
}

log(...content(lines))

// We need to go deeper, generator inception

function* concat(source1, source2) {
    yield* content(source1)
    yield* content(source2)
}

log(...concat(lines, linesUpper))

function* zip(source1, source2) {
    const iterator1 = source1[Symbol.iterator]()
    const iterator2 = source2[Symbol.iterator]()
    let next1 = iterator1.next()
    let next2 = iterator2.next()
    while(!next1.done && !next2.done) {
        yield [next1.value, next2.value]
        next1 = iterator1.next()
        next2 = iterator2.next()
    }
}

log(...zip(lines, linesUpper))
// yields as short as the shortest iterable
log(...zip(lines, [1, 2]))

function* logGenerator() {
    log(yield);
    log(yield);
    log(yield);
    return
}

var logGen = logGenerator()
logGen.next() //init
logGen.next('first attempt')
logGen.next('second attempt')
logGen.next('third attempt')
logGen.next('fourth attempt')
logGen.next('fifth attempt')
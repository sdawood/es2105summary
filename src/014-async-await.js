import {log} from './util/logger'

/**
 * REMEMBER, Trailing commas are ok, and are there for a reason ... to irritate fellow developers now, and make them happy and merge-free later
 *
 * JavaScript has allowed trailing commas in array literals since the beginning,
 * and later added them to object literals (ECMAScript 5)
 * and most recently (ECMAScript 2017) to function parameters.
 */
const englishNumbers = new Map(
        [
            [1, 'one'],
            [2, 'two'],
            [3, 'three'],
        ])
const spanishNumbers = new Map([[1, 'uno'], [2, 'dos'], [3, 'tres']])

function lookupEnglish(number, ms=100) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(englishNumbers.get(number)), ms)
    })
}

function lookupSpanish(number, ms=100) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (spanishNumbers.has(number)) {
                resolve(spanishNumbers.get(number))
            } else {
                reject(new Error(`No translation available for ${number}`))
            }

        }, ms)
    })
}

async function sayInAllLangs(number) {
    const numEn = await lookupEnglish(number) // await extracts resolved value, that means it waits for the promise to resolve
    const numSp = await lookupSpanish(number) // await extracts resolved value
    // only inside an `async` function, the keyword await can be used
    return `${number} in English ${numEn}, and in Spanish ${numSp}`
}

log(sayInAllLangs(1)) // Don't be fooled by the innocent looking syntax, if they return anything, async functions will always return a promise

sayInAllLangs(1)
    .then(data => log(data))
    .catch(err => log(err.message))

// If the Promise is rejected, the await expression throws the rejected value.

sayInAllLangs(4)
    .then(data => log(data))
    .catch(err => log(err.message))

// we want to use await and move back to synchronous looking code, solution? wrap inside another async function

// Previous version of sayInAllLangs is sequential, it waits for one `awaited` promise to resolve before moving on to the next one
// a faster version would look like this

async function sayInAllLangsParallel(number) {
    const [numEn, numSp] = await Promise.all([
        lookupEnglish(number),
        lookupSpanish(number)
    ])
    return `${number} in English ${numEn}, and in Spanish ${numSp}`
}

// a more intuitive parallel design, remember, promises are `lazy` values after all

async function sayInAllLangsSimpleParallel(number) {
    const numEn = lookupEnglish(number) // Promise, don't wait for it
    const numSp = lookupSpanish(number) // Promise, don't wait for it
    // only inside an `async` function, the keyword await can be used
    return `${number} in English ${await numEn}, and in Spanish ${await numSp}`
}



// now it is easy to profile your promise based code inside an async function, here is how

async function timeThem() {
    console.time('sayInAllLangs')
    await sayInAllLangs(1)
    console.timeEnd('sayInAllLangs')

    console.time('sayInAllLangsParallel')
    await sayInAllLangsParallel(1)
    console.timeEnd('sayInAllLangsParallel')

    console.time('sayInAllLangsSimpleParallel')
    await sayInAllLangsSimpleParallel(1)
    console.timeEnd('sayInAllLangsSimpleParallel')
}

timeThem()

async function sayEmAll(...numbers) {
    // Let's use loop and try/catch like the good old days
    for(const number of numbers) {
        try {
            let translation = await sayInAllLangsParallel(number) // remember, the return value of an async function is implicitly wrapped in Promise.resolve.
            log(translation)
        } catch(err) {
            log(err.message)
        }
    }
}

sayEmAll(1, 2, 3, 4)

// finally, understand your `async` and `await` quirks

// If the value is not a Promise, it converts the value to a resolved Promise, and waits for it.

async function contrived1() {
    var y = await 20;
    log('contrived1', y); // 20
}
contrived1();

// remember if you return (anything) from async functions, you return a promise

async function contrived2() {
    return 20
}

log('contrived2', contrived2())


// If the Promise is rejected, the rejected value is thrown by `await`

async function contrived3() {
    try {
        var z = await Promise.reject(30);
    } catch(e) {
        console.log('contrived3', e); // 30
    }
}
contrived3();


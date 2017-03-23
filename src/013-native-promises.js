import {TimeoutError} from './util/TimeoutError'

function asyncFunc(...args) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(args), 150)
    })
}

asyncFunc('Nothing to see here')
    .then(data => console.log(data))
    .catch(err => console.log(err.message))


function timeoutPromise(ttl, promise) {
    return new Promise((resolve, reject) => {
        promise.then(resolve).catch(reject)
        setTimeout(() => reject(new TimeoutError(`Timeout after ${ttl} ms`)), ttl)
    })
}

const fantasy = asyncFunc('Forever and Ever')

timeoutPromise(100, fantasy)
    .then(data => console.log(data))
    .catch(err => {
        if (err instanceof TimeoutError) {
            console.log('We timed out naturally', err)
        } else {
            console.log('http://stackoverflow.com/questions/33870684/why-doesnt-instanceof-work-on-instances-of-error-subclasses-under-babel-node')
            console.log(err)
        }
    })


const realisticPromise = asyncFunc('In this life')
timeoutPromise(200, realisticPromise)
    .then(data => console.log(data))
    .catch(err => {
        if (err instanceof TimeoutError) {
            console.log('We timed out naturally', err)
        } else {
            console.log('http://stackoverflow.com/questions/33870684/why-doesnt-instanceof-work-on-instances-of-error-subclasses-under-babel-node')
            console.log(err)
        }
    })

Promise.all(
    ['hello', 'world']
        // .map(asyncFunc) // intentional mess up, map passed (value, index, WHOLE_LIST) which is never realistic if you view lists as iterators/generators
        .map(word => asyncFunc(word)) // correct
    )
    .then(([word1, word2]) => console.log(word1, word2)) // NOTE: using ...args for a single argument, don't forget to unpack your values

Promise.race(
    [['soon', 100], ['later', 200]]
        .map(([value, ttl]) => timeoutPromise(ttl, asyncFunc(value)))
    )
    .then(firstWinner => console.log(firstWinner))
    .catch(err => console.log('firstLoser', err))


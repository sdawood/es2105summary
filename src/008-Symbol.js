import logger from './util/logger'
import util from 'util'

const MONDAY = Symbol('Monday')
const TUESDAY = Symbol('Tuesday')
const WEDNESDAY = Symbol('Wednesday')
const THURSDAY = Symbol('Thursday')
const FRIDAY = Symbol('Friday')
const SATURDAY = Symbol('Saturday')
const SUNDAY = Symbol('Sunday')

function callHours(weekDay) {
    switch (weekDay) {
        case MONDAY:
        case TUESDAY:
        case WEDNESDAY:
        case THURSDAY:
        case FRIDAY:
            return [9, 5]
        case SATURDAY:
        case SUNDAY:
            return [12, 3]
        default:
            throw new Error(`Unknown day ${weekDay}`) // Can't be coerced to string ... bummer
            // throw new Error(`Unknown day ${String(weekDay)}`)
    }
}

logger.log(callHours(MONDAY))
logger.log(callHours(SATURDAY))
try {
    logger.log(callHours(Symbol('Tuesday')))
} catch (err) {
    logger.error(err.message) // TypeError: Cannot convert a Symbol value to a string
}

// Symbols make perfect object keys

const callHoursMap = {
    x: 'string key x value',
    y: 'string key y value',
    [MONDAY]: [9, 5],
    [SATURDAY]: [0, 24],
    [Symbol('Saturday')]: undefined // is a new unique Symbol, so would never match anything
}
logger.log(callHoursMap[SATURDAY])

logger.log('getOwnPropertyNames()', Object.getOwnPropertyNames(callHoursMap))
logger.log('getOwnPropertySymbols()', Object.getOwnPropertySymbols(callHoursMap))
logger.log('Reflect.ownKeys()', Reflect.ownKeys(callHoursMap))
logger.log('Object.keys()', Object.keys(callHoursMap))

// Global symbol registry
const host = Symbol.for('127.0.0.1')

logger.log('returnes same Symbol for key:', Symbol.for('127.0.0.1') === Symbol.for('127.0.0.1'))
logger.log(Symbol.keyFor(host))
logger.log(Symbol.keyFor(Symbol('port'))) // undefined

// more on Symbol.iterator and Symbol.species in due sections
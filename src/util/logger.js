import util from 'util'
import _ from 'lodash' // module.exports = obj in CommonJS === exports default obj

export const LOGGER_NAME_SYMBOL = Symbol.for('MAIN_LOGGER')

export const log = (...args) => console.log(...args.map(stringify))

export const error = (...args) => console.error(...args.map(stringify))

const stringify = value => _.isString(value)? value : util.inspect(value, false, null)

const logger = {log, error}

export default logger

// variations

// export {log as LOG}
// export {logger as default}

// vvvv Syntax error vvvv
// export default const logger = {log, error}
// default can't be followed by a declaration to avoid the temptation of multiple declaration on the export default line

// re-export
export {inspect} from 'util'
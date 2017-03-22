import myLogger from './util/logger' // default, name it whatever you like
// or
import {default as mySameLogger} from './util/logger'

import {log, error as logError} from './util/logger' // named imports, rename is possible via `as`

import * as LOGGER from './util/logger' // import everything as an object

import './util/logger' // doesn't import anything, would only execute module level code in util/logger if any, i.e. import for side effects

import myDefaultLogger, {error} from './util/logger'

myLogger.log('default import with local name')
mySameLogger.log('default is a named export that can be renamed')
log('named imports destrucre the exported namespace')
logError('named exports can be renamed using as')
LOGGER.log('the whole namespace can be imported and given an alias via `as`')
myDefaultLogger.log('if you want to import default and named on the same line, default must come first as shown above')




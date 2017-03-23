export class TimeoutError extends Error {
    constructor(message, code=0) {
        super(message)
        this.name = this.constructor.name
        this.code = code
        Error.captureStackTrace(this, this.constructor)
    }
}
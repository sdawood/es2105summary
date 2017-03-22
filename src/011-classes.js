import {log} from './util/logger'

// just a syntax sugar
// no private properties/methods
// no static properties
// no multiple inheritance (mixins)
// FAVOR COMPOSITION OVER INHERITANCE
// FAVOR PROTOTYPE INHERITANCE DONE RIGHT, more on that some other time ...
// read more here: http://exploringjs.com/es6/ch_classes.html
// moving on ...

class Point {
    constructor(x, y) {
        this._x = x
        this._y = y
    }

    // static methods

    static get ZERO() {
        return new Point(0, 0)
    }

    static from(x, y) {
        return new Point(x, y)
    }

    // read only properties

    get x() {
        return this._x
    }

    get y() {
        return this._y
    }

    // read/write proprties

    set tag(value) {
        this.tag = value
    }

    get tag() {
        return this.tag
    }

    plot () {
        console.log(this.x, this.y)
    }

    toString() {
        return `(${this.x}, ${this.y})`
    }

}

class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y)
        this.color = color
    }
    toString() {
        return super.toString() + ' in ' + this.color
    }
}

const p1 = new Point(50, 100)
const p2Coordinates = [70, 700]
const p2 = Point.from(...p2Coordinates)
const redPoint = new ColorPoint(60, 600, 'Red')

log(p1.toString())
log(p2.toString())
log(redPoint.toString())
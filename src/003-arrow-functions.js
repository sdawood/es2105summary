function FooThis() {
    this.name = 'FooThis function'
    console.log(this.name)
    setTimeout(function() { console.log('... async this.name', this.name)}, 0)
}

const foothis = new FooThis()

function FooThat() {
    var that = this
    that.name = 'FooThat function'
    console.log(that.name)
    setImmediate(function() { console.log('... async this.name', that.name)})
}

const foothat = new FooThat()

function FooBind() {
    this.name = 'FooBind function'
    console.log(this.name)
    process.nextTick(function() { console.log('... async this.name', this.name)}.bind(this))
}

const foobind = new FooBind()

function FooArrow() {
    this.name = 'FooArrow function'
    console.log(this.name)
    process.nextTick(() => { console.log('... async this.name', this.name)})
}

const fooarrow = new FooArrow()

/**
 * Variations
 */

// x => y // implicit return
const list = [0, 1, 2, 3, 4, 5]
console.log(list.map(v => v * 2))

// () => { ... } // no parameter
// x => { ... } // one parameter, an identifier
// (x, y) => { ... } // several parameters

const foo = (name) => {user: {firstName: name}} // user is considered a lable!!!
console.log(foo('Bob')) //returns undefined

const bar = (name) => ({user: {firstName: name}}) // returning object literal MUST be wrapped in parenthesis
console.log(bar('Bob'))
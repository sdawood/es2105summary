const firstName = 'John'
const lastName = 'Smith'

const simpleTemplate = `string text that has (quoted) 'firstName': ${firstName}
and 'lastName': ${lastName}
and it spans multiple lines
variables have to be in scope`

console.log(simpleTemplate)

function template(strings, ...keys) {
    console.log(strings)
    console.log(keys)
    return (function(...values) {
        var dict = values[values.length - 1] || {}
        var result = [strings[0]]
        keys.forEach(function(key, i) {
            var value = Number.isInteger(key) ? values[key] : dict[key]
            result.push(value, strings[i + 1])
        });
        return result.join('')
    });
}

// NOTICE: quoted strings inside interpolation expression
const lazyFullNameTemplate = template`Welcome user: ${'lastName'} ... ${'firstName'} ... ${'lastName'}`
console.log(lazyFullNameTemplate({firstName: 'James', lastName: 'bond'}))

const lazySQLTemplate = template`SELECT * from ${'tableName'} where ${'columnName'} = ${'columnValue'}`
console.log(lazySQLTemplate({tableName: 'BIG_TABLE', columnName: 'KEY_COLUMN', columnValue: 'SPECIAL_VALUE'}))

const lazyPositionalTemplate = template`Welcome user: ${0} ... ${1}`
console.log(lazyPositionalTemplate('James', 'bond'))
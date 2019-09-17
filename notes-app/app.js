const validator = require('validator')
const getNotes = require('./notes')

const msg = getNotes()

console.log(msg)
console.log(validator.isEmail('demo@demo.com'))
console.log(validator.isURL('www.loremipsum.com'))
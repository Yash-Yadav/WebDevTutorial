const validator = require('validator')
const getNotes = require('./notes')
const chalk = require('chalk')

const msg = getNotes()
console.log(chalk.bold.white.bgGreen(msg))
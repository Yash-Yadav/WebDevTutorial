const validator = require('validator')
const getNotes = require('./notes')
const chalk = require('chalk')

// const msg = getNotes()
// console.log(chalk.bold.white.bgGreen(msg))

const command = process.argv[2]

if (command === 'add') {
  console.log('Adding Note...')
}
else if (command === 'remove') {
  console.log('Removing Note...')
}
else {
  console.log('Invalid Command')
}
console.log(process.argv)
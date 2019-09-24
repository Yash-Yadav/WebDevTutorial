const chalk = require('chalk')
const yargs = require('yargs')
const getNotes = require('./notes')

// Customize yargs version
yargs.version('1.1.0')

// Create add Command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note Body',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function (argv) {
    console.log('Title: ' + argv.title)
    console.log('Body: '  + argv.body)
  }
})

// Create remove Command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  handler: function () {
    console.log('Removing the Note!')
  }
})

// Create list Command
yargs.command({
  command: 'list',
  describe: 'listing your notes',
  handler: function () {
    console.log('Listing out all Note!')
  }
})

// Create read Command
yargs.command({
  command: 'read',
  describe: 'Read a note',
  handler: function () {
    console.log('Reading the Note!')
  }
})

yargs.parse()


// const validator = require('validator')
// const getNotes = require('./notes')
// const chalk = require('chalk')

// // const msg = getNotes()
// // console.log(chalk.bold.white.bgGreen(msg))

// const command = process.argv[2]

// if (command === 'add') {
  //   console.log('Adding Note...')
  // }
  // else if (command === 'remove') {
    //   console.log('Removing Note...')
    // }
    // else {
//   console.log('Invalid Command')
// }
// console.log(process.argv)
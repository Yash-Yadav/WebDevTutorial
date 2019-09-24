const fs = require('fs')
const chalk = require('chalk')

const getNotes = function () {
  return 'Your Notes...'
}

const saveNotes = function(notes) {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function() {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return[]
  }
}

const addNote = function(title, body) {
  const notes = loadNotes()
  const duplicateNotes = notes.filter(function (note) {
    return note.title === title
  })
  // Check if the note's title already exists
  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('New Note Added!'))
  } else {
    console.log(chalk.yellow.inverse('Note title Taken!'))
  }
}

const removeNote = function (title) {
  const notes = loadNotes()
  const notesToKeep = notes.filter(function(note) {
    return note.title !== title
  })

  // Comparing if a node is removed
  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse('Note Removed'))
    saveNotes(notesToKeep)
  } else {
    console.log(chalk.red.inverse('Note Not Found'))
  }
}

module.exports = {
  getNotes:   getNotes,
  addNote:    addNote,
  removeNote: removeNote
}
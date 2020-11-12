const fs = require('fs');
const path = require('path');

function filterByQuery(query, notes) {
    let filterResults = notes;
    if (query.title) {
        filterResults = filterResults.filter(
            (note) => note.title === query.title
        );
    }
    return filterResults;
}

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

function getId(id, notes){
    const noteId = notes.filter(note => note.id === id);
    return noteId;
}

module.exports = {
    filterByQuery,
    createNewNote,
    validateNote,
    getId
};
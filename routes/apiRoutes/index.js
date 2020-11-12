const router = require('express').Router();
const uniqid = require('uniqid');

const { filterByQuery, createNewNote, validateNote, getId, deleteNote } = require('../../lib/notes');
const { notes } = require('../../db/db.json');

router.get('/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.post('/notes', (req, res) => {
    // set id based on next index of array
    req.body.id = uniqid();

    // if any data is incorrect, send 400 error
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, notes);

        res.json(note);
    }
});

router.delete('/notes/:id', (req, res) => {
    const note = getId(req.params.id, notes);
    const id = req.params.id;
    if (id < 0) {
        res.sendStatus(404)
    }
    res.send(`Got a DELETE request at /notes/${id}`);
    const noNote = deleteNote(note, notes);
    return noNote;
});

module.exports = router;
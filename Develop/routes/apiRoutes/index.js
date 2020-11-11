const router = require('express').Router();

const { filterByQuery, createNewNote, validateNote } = require('../../lib/notes');
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
    req.body.id = notes.length.toString();

    // if any data is incorrect, send 400 error
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, notes);

        res.json(note);
    }
});


module.exports = router;
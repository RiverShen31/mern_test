const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Note = require('./Note');
const app = express();

app.use(cors());

app.use(express.json());

app.get('/api/notes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json({message: "Fetch notes successfully", data: notes});
    } catch(err) {
        res.status(500).json({message: "Error", error: err});
    }
})

app.post('/api/notes', async(req, res) => {
    try {
        const newNote = new Note({
            title: req.body.title,
            content: req.body.content
        })
        const savedNote = await newNote.save();
        res.status(200).json({message: "Fetched notes successfully", data: savedNote});
    } catch(err) {
        res.status(500).json({message: "Error", error: err});
    }
})

app.all('*', (req, res) => {
    res.status(404).send("<h1>404 | Page Not Found</h1>");
})

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to Mongodb'))
    .catch(err => console.log(err));

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
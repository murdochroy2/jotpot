const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    tag: {type: String, default: "General"},
    date: {type: Date, default: Date.now},
    content: String
});

module.exports = mongoose.model('notes', NoteSchema);
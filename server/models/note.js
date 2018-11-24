const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    created_by: {
        type: String,
        default: ''
    },
    shared: {
        type: Array,
        default: []
    },
    rootFolder: {
        type: String,
        default: undefined
    },
    path: {
        type: String,
        default: undefined
    },
    type: {
        type: String,
        default: 'text'
    },
    content: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    tags: {
        type: String,
        default: ''
    }
}, { collection: 'notes' });

module.exports = mongoose.model('Note', noteSchema);

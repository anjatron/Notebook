const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
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
    name: {
        type: String,
        default: ''
    }
}, { collection: 'folders' });

module.exports = mongoose.model('Folder', folderSchema);

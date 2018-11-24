const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const User = require('./models/user');
const Folder = require('./models/folder');
const Note = require('./models/note');

const Config = require('../config');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const server = app.listen(4000, () => {
    var host = server.address().address || '127.0.0.1';
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', '127.0.0.1', port);

    mongoose.connect(Config.uri).then(() => {
        console.log('success connecting to mongodb with mongoose');
      }, (err) => {
        console.log('error connecting to mongodb with mongoose: ', JSON.stringify(err));
      });
});

app.get('/api', (req, res) => {
    res.send('hit api');
});

app.post('/api/login', (req, res) => {
    console.log('login: ', req.body);

    const UserModel = new User({
        username: req.params.username
    });

    console.log(UserModel.username);

    User.findOneAndUpdate(req.body, {$setOnInsert: req.body}, { upsert:true }, function (err, doc) {
        if (err) {
            res.json(err);
            return;
        } 
        res.json(doc);
    });
});

// NOTES
app.get('/api/notes/:username', (req, res) => {
    console.log('notes by: ', req.params.username);

    Note.find({'created_by.username': req.params.username}, function (err, doc) {
        if (err) {
            res.json(err);
            return;
        } 
        res.json(doc);
    });
});

app.get('/api/notes/:username', (req, res) => {
    Note.find({'created_by.username': req.params.username}, function (err, doc) {
        if (err) {
            res.json(err);
            return;
        } 
        res.json(doc);
    });
});

app.get('/api/notes/:noteId', (req, res) => {
    Note.findOne({'_id': req.params.noteId}, function (err, doc) {
        if (err) {
            res.json(err);
            return;
        } 
        res.json(doc);
    });
});

app.post('/api/notes/:noteId', (req, res) => {
    Note.updateOne({ '_id' : req.params.noteId }, {$set: req.body}, { upsert:true }, function (err, doc) {
        if (err) {
            res.json(err);
            return;
        } 
        res.json(doc);
    });
});

app.delete('/api/notes/:noteId', (req, res) => {
    Note.deleteOne({ '_id' : req.params.noteId }, function (err, doc) {
        if (err) {
            res.json(err);
            return;
        } 
        res.json(doc);
    });
});

// FOLDERS
app.get('/api/folders/:username', (req, res) => {
    Folder.find({'created_by.username': req.params.username}, function (err, doc) {
        if (err) {
            res.json(err);
            return;
        } 
        res.json(doc);
    });
});

app.get('/api/folders/:folderId', (req, res) => {
    Folder.findOne({'_id': req.params.folderId}, function (err, doc) {
        if (err) {
            res.json(err);
            return;
        } 
        res.json(doc);
    });
});

app.post('/api/folders/:folderId', (req, res) => {
    Folder.updateOne({ '_id' : req.params.folderId }, {$set: req.body}, { upsert:true }, function (err, doc) {
        if (err) {
            res.json(err);
            return;
        } 
        res.json(doc);
    });
});

app.delete('/api/folders/:folderId', (req, res) => {
    Folder.deleteOne({ '_id' : req.params.folderId }, function (err, doc) {
        if (err) {
            res.json(err);
            return;
        } 
        res.json(doc);
    });
});

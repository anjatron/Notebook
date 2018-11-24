
import {MongoClient} from 'mongodb';

import Config from '../../config';

var NotebookService = {
    getAllNotesByUser: function (payload, callback) {
        MongoClient.connect(Config.uri).then((client) => {
            const db = client.db(Config.dbName);

            const collection = db.collection('notes');

            collection.find({"created_by.username": payload}).toArray(function (err, items) {
                if (err) {
                    callback(err, null);
                }
                callback(null, items);
                client.close();
                // return items;
            });
        }).catch((error) => {
            console.error('error connecting to mongodb while getting all notes by'); 
            // cb(error, null);
            return error;
        });
    },

    getAllFoldersByUser: function (payload, callback) {
        MongoClient.connect(Config.uri).then((client) => {
            const db = client.db(Config.dbName);

            const collection = db.collection('folders');

            collection.find({"created_by.username": payload}).toArray(function (err, items) {
                if (err) {
                    callback(err, null);
                    // return err;
                }
                callback(null, items);
                client.close();
                // return items;
            });
        }).catch((error) => {
            console.error('error connecting to mongodb while getting all folder by user'); 
            callback(error, null);
            // return error;
        });
    },

    getNote: function (payload, callback) {
        let _client = undefined;
        MongoClient.connect(Config.uri).then(client => {
                _client = client;
                return client.db(Config.dbName)
            }).then((db) => {
                return db.collection('notes').findOne({'_id': payload})
            })
            .then((result) => {
                if (callback) {
                    callback(null, result);
                } 
                _client.close();
            })
            .catch((error) => {
                callback(error, null);
                console.log(error);
            });
    },

    getFolder: function (payload, callback) {
        let _client = undefined;
        MongoClient.connect(Config.uri).then(client => {
                _client = client;
                return client.db(Config.dbName)
            }).then((db) => {
                return db.collection('folders').findOne({'_id': payload})
            })
            .then((result) => {
                if (callback) {
                    callback(null, result)
                } 
                _client.close();
            })
            .catch((error) => {
                callback(error, null);
                console.log(error);
            });
    },

    createNote: function (payload, callback) {
        let _client = undefined;
        MongoClient.connect(Config.uri).then(client => {
                _client = client;
                return client.db(Config.dbName)
            }).then((db) => {
                return db.collection('notes').updateOne({ '_id' : payload._id }, {$set: payload}, { upsert:true })
            })
            .then((result) => {
                if (callback) {
                    callback(null, result)
                } 
                _client.close();
            })
            .catch((error) => {
                callback(error, null);
                console.log(error);
            });
    },

    createFolder: function (payload, callback) {
        let _client = undefined;
        MongoClient.connect(Config.uri).then(client => {
                _client = client;
                return client.db(Config.dbName)
            }).then((db) => {
                return db.collection('folders').updateOne({ '_id' : payload._id }, {$set: payload}, { upsert:true })
            }).then((result) => {
                if (callback) {
                    callback(null, result);
                }
                _client.close();
            }).catch((error) => {
                callback(error, null);
                console.log(error);
            });
    },

    deleteNote: function (payload, callback) {
        let _client = undefined;
        MongoClient.connect(Config.uri).then(client => {
                _client = client;
                return client.db(Config.dbName)
            }).then((db) => {
                return db.collection('notes').deleteOne({ _id : payload })
            })
            .then((result) => {
                if (callback) {
                    callback(null, 'success');
                }
                _client.close();
            })
            .catch((error) => {
                callback(error, null);
                console.log(error);
            });
    },

    deleteFolder: function (payload, callback) {
        let _client = undefined;
        MongoClient.connect(Config.uri).then(client => {
                _client = client;
                return client.db(Config.dbName)
            }).then((db) => {
                return db.collection('folders').deleteOne({ _id : payload })
            })
            .then((result) => {
                if (callback) {
                    callback(null, 'success');
                }
                _client.close();
            }).catch((error) => {
                callback(error, null);
                console.log(error);
            });
    },
};

export default NotebookService;
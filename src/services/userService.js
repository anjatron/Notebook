
import {MongoClient} from 'mongodb';

var Config = '../config.json';

var uri = "mongodb+srv://anjatron:darthCLEO@cluster0-jtdyw.gcp.mongodb.net/test?retryWrites=true";


var UserService = {
    createUser: function (payload) {
        return new Promise((resolve, reject) => { 
            MongoClient.connect(uri, function(err, client) {
                if (err) {
                    console.error('error connecting to mongodb'); 
                    reject(err);
                } else {
                    const db = client.db("test");
    
                    const collection = db.collection('users');
    
                    resolve(collection.updateOne({ "username" : payload }, {$setOnInsert: {username: payload}}, { upsert:true }));

                    client.close();
                }
            });
        })
    },

    getUsers: function () {
        MongoClient.connect(uri).then((client) => {
            const db = client.db("test");

            const collection = db.collection('folders');

            collection.find({}).toArray(function (err, items) {
                if (err) {
                    // cb(err, null);
                    return err;
                }
                // cb(null, items);
                client.close();
                return items;
            })
        }).catch((error) => {
            console.error('error connecting to mongodb while getting all users'); 
            // cb(error, null);
            return error;
        });
    }
}

export default UserService;
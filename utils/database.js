const mongodb = require('mongodb');

const Mongoclient = mongodb.MongoClient;
const username = encodeURIComponent("narayanan");
const password = encodeURIComponent("mongodb2023");
let _db;

const mongoConnect = (callback) => {
    // cluster0 is our cluster
    // shop will be our database, which will be created on the fly
    Mongoclient.connect(`mongodb+srv://${username}:${password}@cluster0.7huboie.mongodb.net/shop?retryWrites=true`).then(client => {
        // console.log("Connected!");
        // console.log(client);
        _db = client.db();
        callback(client);
    }).catch(err => {
        console.log(err);
        throw err;
    })
}

const getDB = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
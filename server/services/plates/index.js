const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = "license-plate-game";

const _log = (item) => console.log(item); // eslint-disable-line no-console

const _connect = (cb) => {
    MongoClient
        .connect(url, function (err, client) {
            //
            _log({err});
            _log("Connected successfully to server");

            const db = client.db(dbName);
           return cb(db);
        });
}

const  getAllPlates =  (f, callback) => {
    _log("getting all plates")

    _connect((db) => {
        const _col = db.collection("plates");
        _col.find({}).toArray((err, plates) => {
            return callback(err, plates);
        })
    })
}

// const getFamilyPlates = (familyId) => plates.map(m => {     m.familyId =
// familyId;     return m; })

module.exports = {
    getAllPlates,
    getFamilyPlates: getAllPlates
}
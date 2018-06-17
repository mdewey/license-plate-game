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

const getAllFamiliesAsPromise = () => {
    return new Promise((resolve, reject) => {

        _log("getting all plates")

        _connect((db) => {
            const _col = db.collection("families");
            _col
                .find({})
                .toArray((err, docs) => {
                    if (err) 
                        reject(err);
                    else {
                        resolve(docs);
                    }
                })
        })
    });
}

const markPlateForFamilyAsPromise = (familyId, plateId) => {
    return new Promise((resolve, reject) => {
        _log({msg: "mark plate as done: ", familyId, plateId});

        _connect((db) => {
            
            const _col = db.collection("platesCollected");
            _col
                .find({})
                .toArray((err, docs) => {
                    if (err) 
                        reject(err);
                    else {
                        resolve(docs);
                    }
                })
        })
        return resolve();
    })
}

module.exports = {
    getFamilies: getAllFamiliesAsPromise,
    markPlateForFamily: markPlateForFamilyAsPromise
}
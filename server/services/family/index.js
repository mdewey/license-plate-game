const MongoClient = require('mongodb').MongoClient;

// Connection URL
const config = require("../../config");
// Connection URL
const url = config.MONGO_DB;


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
            const _filter = {
                familyId,
                plateId
            };
            const _update = {
                familyId,
                plateId,
                timeFound: new Date()
            };
            const _options = {
                upsert: true
            };
            const _callback = (err, doc) => {
                if (err) {
                    return reject(err);
                } else 
                    return resolve(doc);
                }
            
            const _col = db.collection("platesCollected");
            _col.update(_filter, _update, _options, _callback)

        })
    })
}

module.exports = {
    getFamilies: getAllFamiliesAsPromise,
    markPlateForFamily: markPlateForFamilyAsPromise
}
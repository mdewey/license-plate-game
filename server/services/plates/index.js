const MongoClient = require('mongodb').MongoClient;
const async = require("async");

// Connection URL
const config = require("../../config");
// Connection URL
const url = config.MONGO_DB;

// Database Name

const _log = (item) => console.log(item); // eslint-disable-line no-console

const _connect = (cb) => {
    MongoClient
        .connect(url, function (err, client) {
            //
            _log({err});
            _log("Connected successfully to server");

            const db = client.db();
            return cb(db);
        });
}

const getAllPlates = (f, callback) => {
    _log("getting all plates")

    _connect((db) => {
        const _col = db.collection("plates");
        _col
            .find({})
            .toArray((err, plates) => {
                return callback(err, plates);
            })
    })
}

const getAllPlatesAsPromise = (familyId) => {
    return new Promise((resolve, reject) => {
        _log("here")
        _connect(db => {
            async.parallel({
                foundPlates: (next) => {
                    const _foundPlates = db.collection("platesCollected");
                    _foundPlates
                        .find({familyId})
                        .toArray((err, docs) => {
                            const _rv = {};
                            docs.forEach(element => {
                                _rv[element.plateId] = element.timeFound
                            });
                            return next(err, _rv);
                        });
                },
                allPlates: (next) => {
                    const _col = db.collection("plates");
                    _col
                        .find({})
                        .toArray((err, plates) => {
                            return next(err, plates);
                        })
                }
            }, (err, results) => {
                if (err) {
                    return reject(err)
                } else {
                    return resolve(results.allPlates.map(plate => {
                        if (results.foundPlates[plate._id]) {
                            plate.found = results.foundPlates[plate._id];
                        }
                        return plate;
                    }))
                }
            })
        });
    })
}

module.exports = {
    getAllPlates,
    getFamilyPlates: getAllPlatesAsPromise
}
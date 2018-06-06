const Plate = require("../../models/Plate");
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
            cb(db);
            client.close();
        });
}

const getAllPlates = () => {
    const logic = (db) => {
        const platesCollection = db.collection('plates');
        platesCollection.find({}).toArray((err, plates) => {
            return plates;
        })
    }
    return _connect(logic);
}

const getFamilyPlates = (familyId) => plates.map(m => {
    m.familyId = familyId;
    return m;
})

module.exports = {
    getAllPlates,
    getFamilyPlates
}
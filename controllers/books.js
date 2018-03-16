const config = require('../config/mongo.js');
const mongodb = require("mongodb");


const mongoConfig = config.mongoConfig;


listBooks = (req, res) => {
    mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        const db = client.db();
        db.collection("books").find({}).toArray(function (err, docs) {
            if (err) {
                handleError(res, err.message, "Failed to get contacts.");
            } else {
                res.status(200).json(docs);
            }
        });

    });

};

addBook = (req, res) => {
    const newBook = req.body;
    mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        const db = client.db();
        db.collection("books").insertOne(newBook, function (err, doc) {
            if (err) {
                handleError(res, err.message, "Failed to create new contact.");
            } else {
                res.status(201).json(doc.ops[0]);
            }
        });

    });
};


editBook = (req, res) => {
    const updateDoc = req.body;
    delete updateDoc._id;
    mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        const db = client.db();
        db.collection("books").updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function (err, doc) {
            if (err) {
                res.sendStatus(403);
            } else {
                updateDoc._id = req.params.id;
                res.status(200).json(updateDoc);
            }
        });
    })

};

module.exports = {listBooks, addBook};
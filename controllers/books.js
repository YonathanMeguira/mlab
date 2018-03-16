const config = require('../config/mongo.js');
const mongodb = require("mongodb");


const mongoConfig = config.mongoConfig;


listBooks = (req, res) => {
    mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
        if (err) {
            console.log(err);
            process.exit(1);
        }

        // Save database object from the callback for reuse.
        db = client.db();
        db.collection("books").find({}).toArray(function(err, docs) {
            if (err) {
                handleError(res, err.message, "Failed to get contacts.");
            } else {
                res.status(200).json(docs);
            }
        });

    });

};

addBook = (req, res) => {

};


module.exports = {listBooks, addBook};
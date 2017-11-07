var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

module.exports = {
    connect: function(connectionUrl,callback) {
    	console.log(connectionUrl);
        MongoClient.connect(connectionUrl, function(err, db) {
            assert.equal(null, err);
            if (err) {
            	console.log("Error in connecting to database");
                callback({ status: false, error: err })
            } else {
                console.log("Connected correctly to server");
                callback({ status: true,error: null, db: db });
            }

        });
    },
    insertRecord: function(Obj, db) {

    },
    getRecord: function(Obj, db) {

    }
}
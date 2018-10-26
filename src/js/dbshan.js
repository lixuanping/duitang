const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbName = 'duitang';//连接总表

function query(tablename, params,callback) {
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);

        const db = client.db(dbName);
        //连接表
        db.collection(tablename).remove(
        params,
        function(err, result) {
            assert.equal(err, null);
            callback(result)
        });

        client.close();
    });
}

module.exports = {
    query: query
}
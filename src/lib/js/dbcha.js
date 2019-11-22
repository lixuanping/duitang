const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbName = 'duitang';

function query(tablename, params, callback) {
	MongoClient.connect(url, function(err, client) {
		assert.equal(null, err);
		const db = client.db(dbName);
		//查
		db.collection(tablename).find(params).toArray(function(err, docs) {
			assert.equal(err, null);
			callback(docs)
		});
		//关闭数据库
		client.close();
	});
}

module.exports = {
	query: query
}
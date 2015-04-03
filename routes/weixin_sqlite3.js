var config = require('../config.default');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(config.sqlitePath);

module.exports = db;
// REQUIREMENTS //
const util = require("util");
const mysql = require("mysql");
const config = require("../config.json");

// CONNECTIONS //

var connection = mysql.createConnection(config);

connection.connect(function (err) {
    if (err) throw (err);
    console.log("Connected on Port: " + connection.threadId);
})
connection.query = util.promisify(connection.query)
module.exports = connection;

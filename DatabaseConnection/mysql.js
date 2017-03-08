/**
 * Created by eetukallio on 8.3.2017.
 */

var mysql      = require('mysql');
var pool = mysql.createPool({
    host     : 'mydb.tamk.fi',
    user     : 'c5ekalli',
    password : 'Secret123',
    database : 'dbc5ekalli1'
});

module.exports = pool;

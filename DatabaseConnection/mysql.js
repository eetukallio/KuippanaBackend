/**
 * Created by eetukallio on 8.3.2017.
 */

const mysql      = require('mysql');
const pool = mysql.createPool({
    host     : 'mydb.tamk.fi',
    user     : 'c5ekalli',
    password : 'Secret123',
    database : 'dbc5ekalli1'
});

module.exports = pool;

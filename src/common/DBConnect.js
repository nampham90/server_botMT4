const mongoose = require('mongoose');
const dbconfig = require("../config/config");
const logToFile = require('./logFile');
const mysql = require('mysql2');

function makeNewConnection(uri,type) {
    if(type=='mongodb') {
        const db = mongoose.createConnection(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    
        db.on('error', function (error) {
            console.log(`MongoDB :: connection ${this.name} ${JSON.stringify(error)}`);
            db.close().catch(() => console.log(`MongoDB :: failed to close connection ${this.name}`));
        });
    
        db.on('connected', function () {
            mongoose.set('debug', function (col, method, query, doc) {
                console.log(`MongoDB :: ${this.conn.name} ${col}.${method}(${JSON.stringify(query)},${JSON.stringify(doc)})`);
                logToFile(`MongoDB :: ${this.conn.name} ${col}.${method}(${JSON.stringify(query)},${JSON.stringify(doc)})`);
            });
            console.log(`MongoDB :: connected ${this.name}`);
        });
    
        db.on('disconnected', function () {
            console.log(`MongoDB :: disconnected ${this.name}`);
        });
    
        return db;
    } else if(type === 'mysql') {
        const db = mysql.createConnection(uri);

        db.on('error', (err) => {
            console.error('MySQL :: error:', err);
        });

        db.on('end', () => {
            console.log('MySQL :: connection ended');
        });

        return db;
    }
}

const dbDemo = makeNewConnection(dbconfig.url, 'mongodb');
const dbKhochung = makeNewConnection(dbconfig.urlkhochung, 'mongodb');
const dbMySQL = makeNewConnection(dbconfig.dbMysqlConfigCTY, 'mysql');

module.exports = {
    dbDemo,
    dbKhochung,
    dbMySQL     
}
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    url: process.env.DB_CONNECT,
    urlkhochung: process.env.DB_CONNECTKHOCHUNG,
    dbMysqlConfig: {
        host: process.env.MSHOST,
        port: process.env.MSPORT,
        user: process.env.MSUSER,
        password: process.env.MSPASSWORD,
        database: process.env.MSDATABASE
    }
}
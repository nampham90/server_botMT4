const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    url: process.env.DB_CONNECT,
    urlkhochung: process.env.DB_CONNECTKHOCHUNG
}
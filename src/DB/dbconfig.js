const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    url: process.env.DB_CONNECT,
    urlkhochung: process.env.DB_CONNECTKHOCHUNG,
    dbMysqlConfig: {
        username: process.env.MSUSER,
        password: process.env.MSPASSWORD,
        host: process.env.MSHOST,
        port: process.env.MSPORT,
        database: process.env.MSDATABASE,
        dialect: process.env.DB_DIALECT
    },
    dbMysqlConfigCTY: {
        username: process.env.MSUSERCTY,
        password: process.env.MSPASSWORDCTY,
        database: process.env.MSDATABASECTY,
        host: process.env.MSHOSTCTY,
        port: process.env.MSPORTCTY,
        dialect: process.env.DB_DIALECT,
    },
    dbMysqlConfigNHA: {
        username: process.env.MSUSERNHA,
        password: process.env.MSPASSWORDNHA,
        database: process.env.MSDATABASENHA,
        host: process.env.MSHOSTNHA,
        port: process.env.MSPORTNHA,
        dialect: process.env.DB_DIALECT
    }
}
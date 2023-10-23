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
    },
    dbMysqlConfigCTY: {
        host: process.env.MSHOSTCTY,
        port: process.env.MSPORTCTY,
        user: process.env.MSUSERCTY,
        password: process.env.MSPASSWORDCTY,
        database: process.env.MSDATABASECTY
    },
    dbMysqlConfigNHA: {
        host: process.env.MSHOSTNHA,
        port: process.env.MSPORTNHA,
        user: process.env.MSUSERNHA,
        password: process.env.MSPASSWORDNHA,
        database: process.env.MSDATABASENHA
    }
}
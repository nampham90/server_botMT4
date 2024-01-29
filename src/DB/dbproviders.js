
const { dbMysqlConfigCTY, dbMysqlConfigNHA, dbMysqlConfig } = require("./dbconfig");
function dbconfig() {
    let config;
    switch(process.env.NODE_DB) {
        case "CTY": config = dbMysqlConfigCTY; break;
        case "NHA": config = dbMysqlConfigNHA; break;
        case "DEV": config = dbMysqlConfig; break;
        default: config = dbMysqlConfig;
    }
    return config;
}

module.exports = dbconfig;
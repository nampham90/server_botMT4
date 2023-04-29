const AbsProcess = require("../abstractProcess/Transaction");
const {ObjectId} = require('mongodb');

class Tmt050getListKBNProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async getListKBN(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        const TMT050 = db.models.tmt050;
        
    }
}

module.exports = Tmt050getListKBNProcess
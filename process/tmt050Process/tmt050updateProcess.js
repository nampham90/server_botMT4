const AbsProcess = require("../abstractProcess/Transaction");

class Tmt050UpdateProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async update(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        const TMT050 = db.models.tmt050;
        
    }
}

module.exports = Tmt050UpdateProcess;
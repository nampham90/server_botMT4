const AbsProcess = require("../abstractProcess/Transaction");
const commonfun = require("../../common/functionCommon");

class Tmt060getAllProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async getAll(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {

    }
}

module.exports = Tmt060getAllProcess;
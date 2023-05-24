const AbsProcess = require("../abstractProcess/Transaction");
const commonfun = require("../../common/functionCommon");

class Tmt060UpdateProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async update(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {

    }
}

module.exports = Tmt060UpdateProcess;
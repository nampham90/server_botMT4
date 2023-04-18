const AbsProcess = require("../abstractProcess/Transaction");

class PhieunhaphangHuybochangProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async huybochang(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {

    }
}

module.exports = PhieunhaphangHuybochangProcess;
const AbsProcess = require("../../../process/abstractProcess/Transaction");

let commonfun = require('../../../common/functionCommon');

class UpdateChuyenngoaiProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async update(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db, data, session) {
        // update chuyến ngoài

        // kiểm tra phân loài pnh . 


    }


}

module.exports = UpdateChuyenngoaiProcess;
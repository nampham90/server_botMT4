const AbsProcess = require("../abstractProcess/Transaction");
const Const = require("../../common/const");
const {ObjectId} = require('mongodb');

class Tmt030GetSystemFlgProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async getSYSFLG(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        const TMT030 = db.models.tmt030;
        let tmt030System = await TMT030.collection.findOne({_id: ObjectId(Const.idTMT030)},{session});
        return tmt030System;
    }
}

module.exports = Tmt030GetSystemFlgProcess;
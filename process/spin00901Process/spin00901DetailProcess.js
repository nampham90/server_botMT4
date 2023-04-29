const AbsProcess = require("../abstractProcess/Transaction");
const {ObjectId} = require("mongodb");

class Spin00901DetailProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    getDetail(data,session) {
        return this.execute(this.database,data,session);
    }

    async process (db,data,session) {
        const TMT050 = db.models.tmt050;
        let kho = await TMT050.collection.findOne({_id: ObjectId(data.id)},{session});
        return kho;
    }
}

module.exports = Spin00901DetailProcess;
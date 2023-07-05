const AbsProcess = require("../abstractProcess/Transaction");
const commonfun = require("../../common/functionCommon");
const {ObjectId} = require('mongodb');
class Tmt060DeleteProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async delete(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        const TMT060 = db.models.tmt060_dichvuthuengoai;
        let res = await TMT060.collection.deleteOne({_id: ObjectId(data.id)},{session});
        return res;
    }
}

module.exports = Tmt060DeleteProcess;
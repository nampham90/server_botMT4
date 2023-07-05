const AbsProcess = require("../abstractProcess/Transaction");
const {ObjectId} = require('mongodb');
class TMT060getDetailProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async getDetail(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        const TMT060 = db.models.tmt060_dichvuthuengoai;
        let dichvu = await TMT060.collection.findOne({_id: ObjectId(data.id)},{session});
        return dichvu;
    }
}

module.exports = TMT060getDetailProcess;
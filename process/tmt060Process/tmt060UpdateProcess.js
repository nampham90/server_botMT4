const AbsProcess = require("../abstractProcess/Transaction");
const commonfun = require("../../common/functionCommon");
const {ObjectId} = require('mongodb');
class Tmt060UpdateProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async update(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        const TMT060 = db.models.tmt060_dichvuthuengoai;
        let res = await TMT060.collection.updateOne(
            {_id: ObjectId(data.id)},
            {$set:{
               tennhacungcap: data.tennhacungcap,
               diachi: data.diachi,
               sodienthoai: data.sodienthoai
            }},
            {session}
        );
        return res;
    }
}

module.exports = Tmt060UpdateProcess;
const AbsProcess = require("../../process/abstractProcess/Transaction");
const {ObjectId} = require('mongodb');
class PhieunhaphangCheckHuyBocHangProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async checkhuybochang(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        const PNH = db.models.phieunhaphang;
        let p = await PNH.collection.findOne({_id: ObjectId(data.ids)},{session});
        if(p.status01 == 1) {
            return 1;
        } 
        return 0;
    }
}

module.exports = PhieunhaphangCheckHuyBocHangProcess;
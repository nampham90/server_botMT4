const AbsProcess = require("../abstractProcess/Transaction");
const { ObjectId } = require('mongodb');

class Spin00801DeleteProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async delete(data,session) {
       return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        const PNH = db.models.phieunhaphang;
        const TIN100 = db.models.tin100;
        await TIN100.collection.deleteOne({soID: data.soID},{session});
        let res = await PNH.collection.deleteOne({soID: data.soID},{session});
        return res;
    }
}

module.exports = Spin00801DeleteProcess;
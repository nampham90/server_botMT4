const AbsProcess = require("../abstractProcess/Transaction");
const { ObjectId } = require('mongodb');

class Spin00801DeletemanyProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async delete(data,session) {
       return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        const TIN100 = db.models.tin100;
        const PNH = db.models.phieunhaphang;
        await TIN100.collection.deleteMany({soID: {$in: data.soIDs}},{session});
        let res = await PNH.collection.deleteMany({soID: {$in: data.soIDs}},{session});
        return res;
    }
}

module.exports = Spin00801DeletemanyProcess;
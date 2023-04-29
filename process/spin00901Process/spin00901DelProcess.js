const AbsProcess = require("../abstractProcess/Transaction");
const { ObjectId } = require('mongodb');

class Spin00901DelProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async delete(data,session) {
       return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        const TMT050 = db.models.tmt050;
        let res = await TMT050.collection.deleteOne({_id: ObjectId(data.id)},{session});
        return res;
    }

}

module.exports = Spin00901DelProcess;
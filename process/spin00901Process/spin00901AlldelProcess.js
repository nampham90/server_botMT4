const AbsProcess = require("../abstractProcess/Transaction");
const {ObjectId} = require("mongodb");

class Spin00901AlldelProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async deleteAll(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        let objectIds = [];
        if (Array.isArray(data)) {
            objectIds = data.map(id => ObjectId(id.trim()));
        }
        const TMT050 = db.models.tmt050;
        let res = await TMT050.collection.deleteMany({_id: {$in: objectIds}},{session});
        return res;
    }
}

module.exports = Spin00901AlldelProcess;
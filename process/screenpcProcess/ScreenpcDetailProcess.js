const AbstractProcess = require("../abstractProcess/Transaction");
const {ObjectId} = require("mongodb");

class ScreenpcDetailProcess extends AbstractProcess {

    constructor(dbcon) {
        super(dbcon)
    }

    async getDetail(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        const Screenpc = db.models.screenpc;
        let Sc = await Screenpc.collection.findOne({_id: ObjectId(data.id)},{session});
        return Sc;
    }
}

module.exports = ScreenpcDetailProcess;
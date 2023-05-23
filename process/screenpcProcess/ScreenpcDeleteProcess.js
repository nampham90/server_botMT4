const AbstractProcess = require('../abstractProcess/AbstractProcess');
const {ObjectId} = require("mongodb");

class ScreenpcDeleteProcess extends AbstractProcess {

    constructor(dbcon) {
        super(dbcon)
    }

    async delete(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        const Screenpc = db.models.screenpc;
        let res = await Screenpc.collection.deleteOne({_id: ObjectId(data.id)},{session});
        return res;
    }

}

module.exports = ScreenpcDeleteProcess;
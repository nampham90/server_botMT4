
const AbstractProcess = require("../../../process/abstractProcess/AbstractProcess");
const {ObjectId} = require("mongodb");

class DemoDeleteProcess extends AbstractProcess {
    constructor(dbCon) {
        super(dbCon);
    }

    async delete(data, session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        const Demo = db.models.demo;
        let res = await Demo.collection.deleteOne({_id: ObjectId(data)},{session});
        if(res.deletedCount === 1) {
            return data;
        }
        return -1;
    }
}

module.exports = DemoDeleteProcess;
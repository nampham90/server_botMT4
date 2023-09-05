const AbstractProcess = require("../../../process/abstractProcess/AbstractProcess");
const {ObjectId} = require("mongodb");
const DemoDetailProcess = require("../process/demoDetailProcess");
class DemoUpdateProcess extends AbstractProcess {

    constructor(dbCon) {
        super(dbCon)
    }

    async update(data, session) {
        return this.execute(this.database, data, session);
    }

    async process(db, data, session) {
        const Demo = db.models.demo;
        let update = await Demo.collection.updateOne(
            {_id: ObjectId(data.id)},
            {$set: {
                proname: data.proname,
                price: data.price
            }},
            {session}
        );

        if(update.acknowledged === true) {
            const demoDetailProcess = new DemoDetailProcess(this.database);
            let detail = await demoDetailProcess.detail(data.id,session);
            return detail;
        }
      return null;
    }
}

module.exports = DemoUpdateProcess;
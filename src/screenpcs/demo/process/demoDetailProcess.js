const AbstractProcess = require("../../../process/abstractProcess/AbstractProcess");
const {ObjectId} = require("mongodb");

class DemoDetailProcess extends AbstractProcess {
    constructor(dbCon) {
        super(dbCon)
    }

    async detail(data,session) {
        return this.execute(this.database, data, session);
    }

    async process(db, data, session) {
        const Demo = db.models.demo;
        let detail = await Demo.collection.findOne({_id: ObjectId(data)}, {session});
        if(detail) {
            let resDetail = {
                id: detail._id,
                idpro: detail.idpro,
                proname: detail.proname,
                price: detail.price,
                completed: detail.completed
            }
            return resDetail;
        }
        return null
    }
}

module.exports = DemoDetailProcess;
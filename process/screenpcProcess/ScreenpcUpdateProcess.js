const AbstractProcess = require("../abstractProcess/Transaction");
const {ObjectId} = require("mongodb");

class ScreenpcUpdateProcess extends AbstractProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async update(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        const Screenpc = db.models.screenpc;
        let res = await Screenpc.collection.updateOne(
            {_id: ObjectId(data.id)},
            {$set:{
                title1: data.title1,
                title2: data.title2, 
                vitri: data.vitri, 
                lang: data.lang, 
                status:data.status
            }},
            {session}
        );
        return res;
    }
}

module.exports = ScreenpcUpdateProcess;
const AbsProcess = require("../abstractProcess/Transaction");
const ObjectId = require('mongodb');

class Spin00901UpdateProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async update(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        const TMT050 = db.models.tmt050;
        let res = await TMT050.collection.updateOne(
            {_id: data.id},
            {$set:{
               datacd: data.datacd,
               datanm: data.datanm,
               datarnm: data.datarnm
            }},
            {session}
        );
        return res;
    }

     
}

module.exports = Spin00901UpdateProcess;
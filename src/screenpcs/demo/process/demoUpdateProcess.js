const AbstractProcess = require('../../../process/abstractProcess/AbstractProcess');
const {ObjectId} =require('mongodb');
class DemoUpdateProcess extends AbstractProcess {
    constructor(dbCon) {
        super(dbCon)
    }

    async update(req, session) {
        return this.execute(this.database, req, session);
    }

    async process(db, data, session) {
        const Demo = db.models.demo;
        let update = await Demo.collection.updateOne({_id: ObjectId(data.id)},
        {$set: 
            {
                proname: data.proname,
                price: data.price
            }
        },{session});
        if(update.acknowledged === true) {
             return update;
        } 
        return null;

    }
}

module.exports = DemoUpdateProcess;
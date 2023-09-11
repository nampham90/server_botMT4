const AbstractProcess = require('../../../process/abstractProcess/AbstractProcess');
const {ObjectId} = require('mongodb');
class DemoDeleteProcess extends AbstractProcess {
    constructor(dbCon) {
        super(dbCon)
    }

    async delete(req, session) {
        return this.execute(this.database, req, session);
    }

    async process(db, data, session) {
        const Demo = db.models.demo;
        let rs = await Demo.collection.deleteOne({_id: ObjectId(data)},{session});
        if(rs.deletedCount === 1) {
            return rs;
        } 
        return null
    }
}

module.exports = DemoDeleteProcess;
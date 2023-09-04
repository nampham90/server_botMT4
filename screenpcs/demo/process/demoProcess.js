
const AbstractProcess = require("../../../process/abstractProcess/AbstractProcess");
const {ObjectId} = require("mongodb");
class DemoProcess extends AbstractProcess {

    constructor(dbcon) {
        super(dbcon);
    }

    async create(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db, data, session) {
        const Demo = db.models.demo;
        let newDemo = new Demo({
            idpro: data.idpro,
            proname: data.proname,
            price: data.price,
            completed: false
        });
        let rs =  await Demo.collection.insertOne(newDemo, { session });
        if(rs.insertedId) {
            let detail = await Demo.collection.findOne({_id: ObjectId(rs.insertedId)},{session});
            return detail;
        }
        return null;
    }
}

module.exports = DemoProcess
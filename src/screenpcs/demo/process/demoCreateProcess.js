const AbstractProcess = require('../../../process/abstractProcess/AbstractProcess');

class DemoCreateProcess extends AbstractProcess {
    constructor(dbCon) {
        super(dbCon)
    }

    async create(req, session) {
        return this.execute(this.database, req, session);
    }

    async process(db, data, session) {
        const Demo = db.models.demo;
        let newDemo = new Demo({
            idpro: data.idpro,
            proname: data.proname,
            price: data.price,
            completed: false
        });
        let rs = await Demo.collection.insertOne(newDemo, {session});
        return rs;
    }
}

module.exports = DemoCreateProcess;
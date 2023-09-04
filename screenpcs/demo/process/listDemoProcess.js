const AbstractProcess = require("../../../process/abstractProcess/AbstractProcess");

class ListDemoProcess extends AbstractProcess {
    constructor(dbCon) {
        super(dbCon)
    }

    async getlist(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db, data, session) {
        const Demo = db.models.demo;
        let lst = await Demo.find({});
        return lst;
    }
}

module.exports = ListDemoProcess;
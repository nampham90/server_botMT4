const AbstractProcess = require("../abstractProcess/Transaction");

class ScreenpcAddlistProcess extends AbstractProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    addList(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        const Screenpc = db.models.screenpc;
        let lst = data.list;
        let i = 0;
        for(let element of lst) {
            let newSceen =new Screenpc({
                idmenu:element.idmenu,
                lang:element.lang,
                title1: element.title1,
                title2: element.title2 == null? "" : element.title2,
                vitri: element.vitri,
                status: element.status
            })
            let kq =  await Screenpc.collection.insertOne(newSceen, { session });
            if(kq['insertedId']) {
                i++
            }
        }
        return i;
    }
}

module.exports = ScreenpcAddlistProcess;
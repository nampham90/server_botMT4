const AbsProcess = require("../abstractProcess/Transaction");
const Const = require("../../common/const");
class Spin00901RegisterProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async register(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        const TMT050 = db.models.tmt050;
        if(data.mode == "KHAC") {
            let newKho = new TMT050({
                rcdkbn: data.rcdkbn,//
                datacd: data.datacd,
                datanm: data.datanm,
                datarnm: data.datarnm,
                status01: 0, 
                status02: 0, 
                status03: 0, 
                status04: 0,
                status05: 0
            });
            let res = await TMT050.collection.insertOne(newKho, { session });
            return res;
        } else {
            let newKho = new TMT050({
                rcdkbn: Const.rcdkbnKho,//0001
                datacd: data.datacd,
                datanm: data.datanm,
                datarnm: data.datarnm,
                status01: 0, 
                status02: 0, 
                status03: 0, 
                status04: 0,
                status05: 0
            });
            let res = await TMT050.collection.insertOne(newKho, { session });
            return res;
        }
    }
}

module.exports = Spin00901RegisterProcess;
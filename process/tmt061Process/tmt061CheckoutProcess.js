const AbsProcess = require("../abstractProcess/Transaction");
const {ObjectId} = require('mongodb');
const commonfun = require("../../common/functionCommon");
const moment = require("moment");
class Tmt061CheckoutProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async checkout(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db, data, session) {
        let soHDTTDVTN = await commonfun.fnGetHDTTDVTN();
        let manhacungcap = "";
        let total = 0;
        const TMT061 = db.models.tmt061_congnodichvuthuengoai;
        const TMT062 = db.models.tmt062_hoadonthanhtoancndvtn;
        for(let element of data.listcheckout) {
           manhacungcap = element._id;
           await TMT061.findOneAndUpdate(
            {_id: element.id},
            {$set: {
                status01: "1",
                status05: soHDTTDVTN
            }},
            {session}
           );
           total = total + element.sotien;
        }
        // ghi log
        let newTmt062 = new TMT062({
            soHDTHCNDVTN: soHDTTDVTN,
            manhacungcap: ObjectId(manhacungcap),
            sotien: total,
            ngaylamviec: moment().toDate(),
            status01: "", 
            status02: "", 
            status03: "", 
            status04: "",
            status05: ""

        })

        await TMT062.collection.insertOne(newTmt062,{session});

        return 0;
    }

}

module.exports = Tmt061CheckoutProcess;
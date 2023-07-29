const AbsProcess = require("../../process/abstractProcess/Transaction");
const {ObjectId} = require('mongodb');
//process
const PhieunhaphangCheckHuyBocHangProcess = require("./PhieunhaphangCheckHuyBocHangProcess");

class PhieunhaphangHuybochangProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async huybochang(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        let response = {
            "msgError": ""
        }
        const phieunhaphangCheckHuyBocHangProcess = new PhieunhaphangCheckHuyBocHangProcess(this.database);
        let checkHuybochang = await phieunhaphangCheckHuyBocHangProcess.checkhuybochang(data,session);
        if(checkHuybochang == 1) {
             response.msgError = "Không thể hủy, đơn hàng này đã được bóc lên xe !"
        } else {
            const PNH = db.models.phieunhaphang;
            await PNH.collection.updateOne(
                {_id: ObjectId(data.ids)},
                {$set: {
                    idchuyen: null,
                    soODT: null,
                    biensoxe: null,
                    trangthai: 1
                }},
                {session}
            )   
            const Chuyen = db.models.chuyen;
        }
        
        return response;
    }
}

module.exports = PhieunhaphangHuybochangProcess;
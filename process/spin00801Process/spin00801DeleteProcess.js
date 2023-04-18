const AbsProcess = require("../abstractProcess/Transaction");
const { ObjectId } = require('mongodb');
const Spin00801CheckData = require("./spin00801CheckDataProcess")

class Spin00801DeleteProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async delete(data,session) {
       return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        let response = {
            "msgError": ""
        } 
        const spin00801CheckData = new Spin00801CheckData(this.database);
        let checkData = await spin00801CheckData.checkDataSpin00801(data.soID);
        if(checkData == true) {
            response.msgError = "Dữ liệu của bạn không thể để xóa. !";
        }  else {
            const PNH = db.models.phieunhaphang;
            const TIN100 = db.models.tin100;
            await TIN100.collection.deleteOne({soID: data.soID},{session});
            await PNH.collection.deleteOne({soID: data.soID},{session});
        }
        return response;
    }
}

module.exports = Spin00801DeleteProcess;
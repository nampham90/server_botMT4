const AbsProcess = require("../abstractProcess/Transaction");
const { ObjectId } = require('mongodb');
// process
const Spin00801CheckData = require("./spin00801CheckDataProcess")

class Spin00801DeletemanyProcess extends AbsProcess {
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
        let checkData = await spin00801CheckData.checkDataSpin00801(data.soIDs);
        if(checkData == true) {
             response.msgError = "Dữ liệu của bạn không phù hợp để xóa !";
        } else {
            const TIN100 = db.models.tin100;
            const PNH = db.models.phieunhaphang;
            await TIN100.collection.deleteMany({soID: {$in: data.soIDs}},{session});
            await PNH.collection.deleteMany({soID: {$in: data.soIDs}},{session});
        }
        return response;
    }
}

module.exports = Spin00801DeletemanyProcess;
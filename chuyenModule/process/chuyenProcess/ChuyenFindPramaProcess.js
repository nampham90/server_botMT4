const AbsProcess = require("../../../process/abstractProcess/Transaction");

class ChuyenFindParamProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async search(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        let search = this.paramsSearch(data);
        const Chuyen = db.models.chuyen;
        let allData = await Chuyen.find(search)
        .populate('biensoxe');
        return allData;
    }

    paramsSearch(data){
        // tìm kiếm tất cả chuyến có trạng thái nhỏ hơn hoặc băng 3
        let sreach = {};
        if(data.trangthai){
            sreach.trangthai = {$lte: data.trangthai };
        }
        return sreach;
    }
}
module.exports = ChuyenFindParamProcess
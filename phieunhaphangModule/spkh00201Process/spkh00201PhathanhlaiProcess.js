const AbsProcess = require("../../process/abstractProcess/Transaction");
const GhinhatkyhethongProcess = require("../../process/commonProcess/commonGhinhatkyhethongProcess");
class Spkh00201PhathanhlaiProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async phathanhlai(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db, data, session) {
        let check = await this.checkSoHDTTCNKH(db,data);
        if(check) {
            const PNH = db.models.phieunhaphang;
            // thực hiện lây data cho phat hành lai;
            let lst = await PNH.find({soHDTTCN: { $regex: new RegExp(data.sohdttcnkh + "$") }})
            .populate("iduser",{password:0})
            .populate("nguoiphathanh",{password:0});
            let lstData = [];
            let tenkhachhang = "";
            let sdtkhachhang = "";
            let sohdttcnkh = "";
            let diachi = "";
            let tongcuoc = 0;

            for(let element of lst) {
                tenkhachhang= element['iduser']['name'];
                sdtkhachhang = element['iduser']['dienthoai'];
                diachi = element['iduser']['diachi'];
                tongcuoc = tongcuoc + element['tiencuoc'];
                sohdttcnkh = element['soHDTTCN'];
                let item = {
                    "ngaynhapthucte": element['ngaynhapthucte'],
                    "tenhang": element['tenhang'],
                    "tiencuoc": element['tiencuoc'],
                    "soluong": element['soluong'],
                    "khoiluong": element['khoiluong'],
                    "trongluong": element['trongluong'],
                    "nguoiphathanh": element['nguoiphathanh']['name'],
                }
                lstData.push(item);
            }
            let res = {
                "header": {
                    "tenkhachhang": tenkhachhang,
                    "sdtkhachhang": sdtkhachhang,
                    "diachi": diachi,
                    "sohdttcnkh": sohdttcnkh,
                    "tongcuoc" : tongcuoc
                },
                "lstData": lstData
            }
            return res;
        }
        return null;
    }

    async checkSoHDTTCNKH(db, data) {
        const PNH = db.models.phieunhaphang;
        let search = {}
        search.soHDTTCN = { $regex: new RegExp(data.sohdttcnkh + "$") };
        search.status01 = { $in: [0, 1] };
        search.trangthai = 3;
        let lst = await PNH.find(search);
        if(lst.length > 0) {
            return true;
        }
        return false;
    }
}

module.exports = Spkh00201PhathanhlaiProcess
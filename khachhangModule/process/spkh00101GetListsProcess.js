const AbsProcess = require("../../process/abstractProcess/Transaction");
const {ObjectId} = require('mongodb');
let commonfun = require('../../common/functionCommon');

function KhachhangObject() {
    this.id = "";
    this.makhachhang = "";
    this.name = ""; 
    this.dienthoai = "";
    this.diachi = ''; // tiền đưa trước
    this.sotienno = 0;
    this.dataListChild = [];
}

class Spkh00101GetListsProcess extends AbsProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    async getLists(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db, req, session) {
        const Khachhang = db.models.user;
        const PNH = db.models.phieunhaphang;
        let allData = await Khachhang.find(req.filters);
        if (req.pageNum == 0 && req.pageSize ==0) {
            return allData;
        } else {
            let n = 0;
            if(req.pageNum > 0) {
                n = req.pageNum - 1
            }
            let lst = await Khachhang.find(req.filters).limit(req.pageSize).skip(req.pageSize*n);
            let data = commonfun.dataReponse(allData,lst,req.pageNum,req.pageSize);
            let list = [];
            for(let element of data.list) {
                let obj = new KhachhangObject();
                obj.id = element._id;
                obj.makhachhang = element.makhachhang;
                obj.name = element.name;
                obj.dienthoai = element.dienthoai;
                if(element.diachi != undefined){
                    obj.diachi = element.diachi;
                } else {
                    obj.diachi = "";
                }
                if(element.groupid != undefined) {
                    obj.groupid = element.groupid;
                } else {
                    obj.groupid = "";
                }

                let search = {};
                search.iduser = ObjectId(obj.id);
                search.hinhthucthanhtoan = 2;
                search.ngaynhapthucte = {$ne :null};
                let tongno = 0;
                let lstPNH = await PNH.find(search).sort( { "ngaynhapthucte": -1 } );
                for(let e of lstPNH) {
                    tongno = tongno + e['tiencuoc'];
                }
                obj.sotienno = tongno; 
                obj.dataListChild = lstPNH;
                list.push(obj);
            }
            data.list = list;
            return data;
        }
    }
}

module.exports = Spkh00101GetListsProcess;
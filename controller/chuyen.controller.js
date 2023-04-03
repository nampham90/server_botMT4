const db = require("../model");
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const _ = require('lodash');
const Chuyen = db.chuyen;
const Xe = db.xe;
const Chiphi = db.chiphichuyenxe;
const Pnh = db.phieunhaphang;

function ChuyenObject() {
    this.id = "";
    this.soodt = "";
    this.ngaydi = ""; 
    this.ngayve = "";
    this.tienxe = 0; // tiền đưa trước
    this.biensoxe = {};
    this.idtai = {};
    this.idphu = {};
    this.changduong = ""; // điểm khởi hành và điểm kết thúc
    this.trangthai = 0; // 0 ke hoach bóc. 1.boc hàng lên xe. 2. kiểm hàng
    this.tongcuoc = 0;
    this.tongchiphi = 0;
}

exports.getAllChuyen = async (req,res) => {
    let filters = req.body.filters;
    let gt = "01/01/1970";
    let lt = "01/01/2100";
    let sreach = {};
    if(filters.ngaybatdau) {
        gt = filters.ngaybatdau;
    }
    if(filters.ngayketthuc) {
        lt = filters.ngayketthuc;
    }
    sreach.ngaydi = {$gte:gt,$lt:lt};
    if(filters.trangthai) {
        sreach.trangthai = filters.trangthai;
    }
    if(filters.soodt) {
        sreach.soodt = filters.soodt;
    }
    if(filters.biensoxe && filters.biensoxe != '') {
        let xe = await Xe.findOne({biensoxe:filters.biensoxe});
        if(xe) {
            filters['biensoxe'] = xe._id;
            sreach['biensoxe'] = xe._id;
        } else {
            return res.status(200).send(new Response(1001,"Biển số xe không tồn tại", null));
        }
    } 
    if(filters.idtai && filters.idtai != '') {
        let checkId = commonfun.checkStrId(filters.idtai);
        if(checkId === false) {
            return res.status(200).send(new Response(1001,"Tài chính không tồn tại", null));
        } else {
            sreach['idtai'] = filters.idtai
        }
    } 
    if(filters.idphu && filters.idphu != '') {
        let checkId = commonfun.checkStrId(filters.idphu);
        if(checkId === false) {
            return res.status(200).send(new Response(1001,"Tài phụ không tồn tại", null));
        } else {
            sreach['idphu'] = filters.idphu
        }
    }
    let n = req.body.pageNum - 1;
    if(req.body.pageNum <= 0) {
       n=0;
    }
    let alldata = await Chuyen.find(sreach).sort( { "ngaydi": -1 } )
    .populate('biensoxe')
    .populate('idtai')
    .populate('idphu');
    if(alldata.length == 0) {
        let data = commonfun.dataReponse(alldata,[],req.body.pageNum,req.body.pageSize);
        return res.status(200).send(new Response(0,"Không có dữ liệu", data));
    }
    let lst = await Chuyen.find(sreach).sort( { "ngaydi": -1 } )
    .limit(req.body.pageSize).skip(req.body.pageSize*n)
    .populate('biensoxe')
    .populate('idtai')
    .populate('idphu');
    let data = commonfun.dataReponse(alldata,lst,req.body.pageNum,req.body.pageSize);
    let list = [];    
    for(let element of data.list) {
        let obj = new ChuyenObject();
        obj.id = element._id;
        obj.soodt = element.soodt;
        obj.ngaydi = element.ngaydi;
        obj.ngayve = element.ngayve;
        obj.tienxe = element.tienxe;
        obj.biensoxe = element.biensoxe;
        obj.idtai = element.idtai;
        obj.idphu = element.idphu;
        obj.changduong = element.changduong;
        obj.trangthai = element.trangthai;
        if(element.trangthai == 5) {
            obj.tongcuoc = await  commonfun.tinhtongcuoc(element._id);
            obj.tongchiphi = await  commonfun.tinhtongchiphi(element._id);
        }
        list.push(obj);
    }
    data.list = list;
    return res.status(200).send(new Response(0,"Data sucess", data));
}

exports.createChuyen = async (req,res) => {
    let nth = req.userID;
    let odt = await commonfun.fnGetODT();
    let newchuyen =new Chuyen({
        ngaydi: req.body.ngaydi,
        ngayve: req.body.ngayve,
        tienxe: req.body.tienxe,
        biensoxe:req.body.biensoxe,
        idtai: req.body.idtai,
        idphu: req.body.idphu,
        soodt: odt,
        changduong: req.body.changduong,
        trangthai: 0,
        status01: 0,
        status02: 0,
        status03: 0,
        status04: 0,
        status05: 0,
        ghichu: ""
    });
    newchuyen.save(async function(e){
        if(e) {
           return res.status(200).send(new Response(1001,"save error", null)); 
        } else {
           commonfun.UpdateTrangthaiXe(req.body.biensoxe,true);
           await commonfun.ghiNhatkyhethong("system","Khởi tạo chuyến hàng mới vơi ODT:" + odt, nth, "create", "chuyen");
           return res.status(200).send(new Response(0,"Data sucess", newchuyen));
        }
    })
}

exports.updateChuyen = async (req,res) => {
    let c = await Chuyen.findOne({_id:req.body.id});
    Chuyen.updateOne({_id:req.body.id},{$set:{
        ngaydi:req.body.ngaydi,
        ngayve:req.body.ngayve,
        biensoxe:req.body.biensoxe,
        tienxe:req.body.tienxe,
        idtai: req.body.idtai,
        idphu: req.body.idphu,
        changduong: req.body.changduong,
        
    }})
    .then(data => {
        console.log(data.modifiedCount + " Update Chuyen " + req.body.id);
        commonfun.UpdateTrangthaiXe(c.biensoxe,false);
        commonfun.UpdateTrangthaiXe(req.body.biensoxe,true);
        return res.status(200).send(new Response(0,"Data sucess ", data.modifiedCount));
    })
}

exports.getDetailChuyen = async (req,res) => {
    let id = req.params.id;
    let c = await Chuyen.findOne({_id:id})
    .populate('biensoxe')
    .populate('idtai')
    .populate('idphu');
    if(!c) return res.status(401).send(new Response(1001,"User không tồn tại !",null));
    return res.status(200).send(new Response(0,"Data sucess ", c)); 
}

exports.deleteChuyen = async (req,res) => {
    let nth = req.userID;
    let id = req.body.ids;
    let c = await Chuyen.findOne({_id:id});
    let odt = c['soodt'];
    Chuyen.deleteOne({_id:id})
    .then( async data =>  {
        commonfun.UpdateTrangthaiXe(c.biensoxe,false);
        await commonfun.ghiNhatkyhethong("system","Hủy chuyến hàng mới vơi ODT:" + odt, nth, "delete", "chuyen");
        res.status(200).send(new Response(0,"delete sucess !", data));
    },err=>{
        res.status(200).send(new Response(1001,"Lỗi xóa phòng ban !", null));
    })
}

exports.updateTrangthai = async (req,res) => {
    let id = req.body.id;
    let trangthai = req.body.trangthai

    // check xem tai xe đã tra hết hàng hay chứa
    let lstsptoChuyen = await Pnh.find({idchuyen:id});
    let check = false;
    for(let e of lstsptoChuyen) {
        if(e['status01'] == 0) {
            check = true;
            break;
        }
    }
    if(check == true && trangthai==3) {
        return res.status(200).send(new Response(0,"Tài xế chưa trả xong hàng !", 0));
    }

    let c = await Chuyen.findOne({_id:id});
    if(trangthai == 3) {// hoàn thành trả hang
        
        let listkn = req.body.listkhachno
        if(listkn != undefined && listkn.length > 0) {
            for(let element of listkn) {
              await  commonfun.ghiNhatkyNo(element.idkhachhang,id,element.id,element.tiencuoc,"Nợ","","1");
            }
        } else {
            listkn = await commonfun.getDanhsachkhachnotrongchuyenhang(id);
            for(let element of listkn) {
               await commonfun.ghiNhatkyNo(element.iduser,id,element._id,element.tiencuoc,"Nợ","","1");
            }
        }
    }
    if(trangthai == 4) {// tinh chi phi
       let lstcp = req.body.lstchiphi;
       for(let element of lstcp) {
          let cp = new Chiphi({
             idchuyen: id,
             tenchiphi: element.tenchiphi,
             sotien: element.sotien,
             ghichu: element.ghichu
          });
          await cp.save();
       }
       await Chuyen.updateOne({_id:id}, {$set: {ngayve: _.now()}})
    }
    Chuyen.updateOne({_id:id}, {$set: {trangthai: trangthai}})
    .then(data => {
        console.log(data.modifiedCount + " Update Chuyen " + req.body.id);
        if(trangthai == 3) {
            commonfun.UpdateTrangthaiXe(c.biensoxe,false);
        }
        return res.status(200).send(new Response(0,"Data sucess ", data.modifiedCount));
    },err=>{
        return res.status(200).send(new Response(1001,"thực hiện không thành công !", 0));
    })
}

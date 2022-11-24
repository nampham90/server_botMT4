const db = require("../model");
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const Chuyen = db.chuyen;
const Xe = db.xe;


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
    console.log(sreach);
    let n = req.body.pageNum - 1;
    let alldata = await Chuyen.find(sreach)
    .populate('biensoxe')
    .populate('idtai')
    .populate('idphu');
    if(alldata.length == 0) {
        let data = commonfun.dataReponse(alldata,[],req.body.pageNum,req.body.pageSize);
        return res.status(200).send(new Response(0,"Không có dữ liệu", data));
    }
    let lst = await Chuyen.find(sreach).limit(req.body.pageSize).skip(req.body.pageSize*n)
    .populate('biensoxe')
    .populate('idtai')
    .populate('idphu');
    let data = commonfun.dataReponse(alldata,lst,req.body.pageNum,req.body.pageSize);
    return res.status(200).send(new Response(0,"Data sucess", data));
}

exports.createChuyen = async (req,res) => {
    console.log(req.body);
    let newchuyen =new Chuyen({
        ngaydi: req.body.ngaydi,
        ngayve: req.body.ngayve,
        tienxe: req.body.tienxe,
        biensoxe:req.body.biensoxe,
        idtai: req.body.idtai,
        idphu: req.body.idphu,
        changduong: req.body.changduong,
        trangthai: 0
    });
    newchuyen.save(async function(e){
        if(e) {
           return res.status(200).send(new Response(1001,"save error", null)); 
        } else {
           commonfun.UpdateTrangthaiXe(req.body.biensoxe,true);
           return res.status(200).send(new Response(0,"Data sucess", newchuyen));
        }
    })
}

exports.updateChuyen = async (req,res) => {
    console.log(req.body);
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
    console.log(req.params.id);
    let id = req.params.id;
    let c = await Chuyen.findOne({_id:id})
    .populate('biensoxe')
    .populate('idtai')
    .populate('idphu');
    console.log(c);
    if(!c) return res.status(401).send(new Response(1001,"User không tồn tại !",null));
    return res.status(200).send(new Response(0,"Data sucess ", c)); 
}

exports.deleteChuyen = async (req,res) => {
    console.log(req.body.ids);
    let id = req.body.ids;
    let c = await Chuyen.findOne({_id:id});
    console.log(c);
    Chuyen.deleteOne({_id:id})
    .then(data => {
        commonfun.UpdateTrangthaiXe(c.biensoxe,false);
        res.status(200).send(new Response(0,"delete sucess !", data));
    },err=>{
        res.status(500).send(new Response(1001,"Lỗi xóa phòng ban !", null));
    })
}

exports.updateTrangthai = async (req,res) => {
    console.log(req.body.id);
    let id = req.body.id;
    let c = await Chuyen.findOne({_id:id});
    let listkn = req.body.listkhachno
    if(listkn.length > 0) {
        for(let element of listkn) {
            commonfun.ghiNhatkyNo(element.idkhachhang,id,element.tiencuoc,"Nợ");
        }
    }
    console.log(c);
    let trangthai = req.body.trangthai
    Chuyen.updateOne({_id:id}, {$set: {trangthai: trangthai}})
    .then(data => {
        console.log(data.modifiedCount + " Update Chuyen " + req.body.id);
        if(trangthai == 3) {
            commonfun.UpdateTrangthaiXe(c.biensoxe,false);
        }
        return res.status(200).send(new Response(0,"Data sucess ", data.modifiedCount));
    },err=>{
        res.status(200).send(new Response(1001,"thực hiện không thành công !", 0));
    })
}

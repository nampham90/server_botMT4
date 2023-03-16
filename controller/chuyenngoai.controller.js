const db = require("../model");
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const _ = require('lodash');
const Chuyenngoai = db.chuyenngoai;
const Chitietchuyenngoai = db.chitietchuyenngoai;
const Congnoxengoai = db.congnoxengoai;
const Nhatkykh = db.nhatkykh;

// list all 
exports.PostAllChuyenngoai = async (req,res) => {
    if(req.body.pageSize == 0 && req.body.pageNum == 0) {
        let alldata = await Chuyenngoai.find({})
        .populate('nguonxe');
        return res.status(200).send(new Response(0,"Data sucess", alldata));
    } else {
        if(req.body.filters._id == "") {
            req.body.filters._id = undefined;
        }
        let n = req.body.pageNum - 1;
        let alldata = await Chuyenngoai.find(req.body.filters);
        let lst = await Chuyenngoai.find(req.body.filters).limit(req.body.pageSize).skip(req.body.pageSize*n)
        .populate('nguonxe');
        let data = commonfun.dataReponse(alldata,lst,req.body.pageNum,req.body.pageSize);
        return res.status(200).send(new Response(0,"Data sucess", data));
    }
}

async function CheckIDChuyenngoai(id) {
    if(!id || id.length != 24) return false
    let cn = await Chuyenngoai.findOne({_id:id});
    if (cn) return true;
    return false;
}

async function CheckCongnoChuyenngoai(id) {
    if(!id || id.length != 24) return false
    let cn = await Congnoxengoai.findOne({iddonhang:id});
    if (cn) return true;
    return false;
}

// create cong nơ xe ngoai
async function registerCongNoXeNgoai(nguonxe, iddonhang, biensoxe, tentaixe, sodienthoai, sotienno, ghichu, status02) {
     let cnxengoai = new Congnoxengoai({
        nguonxe: nguonxe,
        iddonhang: iddonhang,
        ngaynhap : _.now(),
        biensoxe: biensoxe,
        tentaixe: tentaixe,
        sodienthoai: sodienthoai,
        sotienno: sotienno,
        status01: 0, // 0. chưa thanh toán. 1. đã thanh toán
        status02: status02, // 0. không ghi công nợ. 1 . có ghi công nợ
        status03: 0, 
        status04: 0,
        status05: 0,
        ghichu: ghichu
     });
     await cnxengoai.save();
}

// tao 
exports.PostCreateChuyenngoai = async (req,res) => {
    let reslistdetail  = [];
    let spch00251Header = req.body.spch00251Header;
    let lstdetail = req.body.spch00251Listdetail;
    let mode = req.body.mode;
    let check = await CheckIDChuyenngoai(spch00251Header.id);
    if (mode == "update" && check === true) {
        //1.update header
        await Chuyenngoai.updateOne({_id: spch00251Header.id},{$set: {
            ngaynhap:spch00251Header.ngaynhap,
            ngayvanchuyen: spch00251Header.ngayvanchuyen,
            ngaydukiengiaohang: spch00251Header.ngaydukiengiaohang,
            nguonxe: spch00251Header.nguonxe, // id nguon xe
            biensoxe: spch00251Header.biensoxe,
            sdtnguonxe: spch00251Header.sdtnguonxe,
            tentaixe: spch00251Header.tentaixe,
            sodienthoai: spch00251Header.sodienthoai,
        }})
        // get list san phẩm trong db
        let lsp = await Chitietchuyenngoai.find({idchuyenngoai: spch00251Header.id});
        let lstDelete = [];
        if(lsp.length > lstdetail.length) {
            for(let element of lsp) {
                let check = true;
                for(let e of lstdetail) {
                    if(element.id == e.id) {
                        check = false;
                    }
                }
                if(check === true) {
                    lstDelete.push(element);
                }
            }
            if(lstDelete.length > 0) {
                // xoa danh sach cap nhat ở bảng chi tiết
                // update lai list ở chuyen ngoài
                // new ghi nơ thì xoa nhat ký ghi nợ
                for(let item of lstDelete) {
                    await Chitietchuyenngoai.deleteOne({_id: item.id});
                    await Chuyenngoai.updateOne({_id:spch00251Header.id},{$pull:{listdetail:item.id}});
                    await Congnoxengoai.deleteOne({iddonhang: item.id});
                }
            }
        }

        //2.phân loai them mơi và update. if(id) update row else create
        for(let element of lstdetail) {
            if (element.id || element._id) {
                // update detail
                await Chitietchuyenngoai.updateOne({_id: element.id},{$set: {
                    idchuyenngoai: spch00251Header.id,
                    thongtindonhang: element.thongtindonhang,
                    diadiembochang: element.diadiembochang,  // 
                    tiencuoc:element.tiencuoc,
                    tiencuocxengoai: element.tiencuocxengoai,
                    htttxengoai: element.htttxengoai,
                    htttkhachhang: element.htttkhachhang,
                    tennguoinhan: element.tennguoinhan,
                    sdtnguoinhan: element.sdtnguoinhan,
                    diachinguoinhan: element.diachinguoinhan,
                    status02: element.status02,
                    ghichu: element.ghichu
                }});
                // kiểm tra hình thức thanh toán bên vận chuyển
                let checkcn = await CheckCongnoChuyenngoai(element.id);
                if (element.htttxengoai == "2") {
                    if(checkcn === false) {
                        registerCongNoXeNgoai(
                            spch00251Header.nguonxe,
                            element.id,
                            spch00251Header.biensoxe,
                            spch00251Header.tentaixe,
                            spch00251Header.sodienthoai,
                            element.tiencuocxengoai,
                            "NO",1);
                    } else {
                        // update so tien no trong bang congnoxe ngoai
                        await Congnoxengoai.updateOne({iddonhang: element.id},{$set: {sotienno:element.tiencuocxengoai, status02: 1}});
                    }
                } else {
                    if(checkcn === false) {
                        registerCongNoXeNgoai(
                            spch00251Header.nguonxe,
                            element.id,
                            spch00251Header.biensoxe,
                            spch00251Header.tentaixe,
                            spch00251Header.sodienthoai,
                            element.tiencuocxengoai,
                            "KNO",0);
                    } else {
                        // update status xoa ghi công nợ nhà vận chuyển
                        await Congnoxengoai.updateOne({iddonhang: element.id},{$set: {sotienno:element.tiencuocxengoai, status02: 0}});
                    }
                }
                // kiểm tra hình thức thanh toán khách khàng
                if (element.htttkhachhang == "2") {
                    // update so tien no trong bang nhatkykh và chuyên sang cơ ghi nợ status02 = 1
                    await Nhatkykh.updateOne({status01: new RegExp(element.id, 'i')}, {$set: {sotien: element.tiencuoc,ghichu:"Nợ", status02:"1"}})
                } else {
                    // update status xóa công nợ khách hàng
                    await Nhatkykh.updateOne({status01: new RegExp(element.id, 'i')},{$set: {sotien: element.tiencuoc,ghichu:"KNợ", status02:""}});
                }
            } else {
                // create detail
                let newDetail = new Chitietchuyenngoai({
                    idchuyenngoai: spch00251Header.id,
                    nguonxe: spch00251Header.nguonxe,
                    thongtindonhang: element.thongtindonhang,
                    diadiembochang: element.diadiembochang,  // 
                    tiencuoc:element.tiencuoc,
                    tiencuocxengoai: element.tiencuocxengoai,
                    htttxengoai: element.htttxengoai,
                    idkhachhang: element.idkhachhang,
                    htttkhachhang: element.htttkhachhang,
                    tennguoinhan: element.tennguoinhan,
                    sdtnguoinhan: element.sdtnguoinhan,
                    diachinguoinhan: element.diachinguoinhan,
                    status01: 0, // trang thai don hang. =0 chưa bóc. =1 đã bóc, =2 đã giáo
                    status02: element.status02, // 
                    status03: 0, 
                    status04: 0,
                    status05: 0,
                    ghichu: element.ghichu
                });
                await newDetail.save();
                // đang ký công no xe ngoài
                if(element.htttxengoai == "2") {
                    registerCongNoXeNgoai(
                        spch00251Header.nguonxe,
                        newDetail._id,
                        spch00251Header.biensoxe,
                        spch00251Header.tentaixe,
                        spch00251Header.sodienthoai,
                        element.tiencuocxengoai,
                        "NO",1);
                } else {
                    registerCongNoXeNgoai(
                        spch00251Header.nguonxe,
                        newDetail._id,
                        spch00251Header.biensoxe,
                        spch00251Header.tentaixe,
                        spch00251Header.sodienthoai,
                        element.tiencuocxengoai,
                        "KNO",0);
                }
                // đăng ký công nợ khách hàng
                let gc = newDetail._id + " Xe ngoài vận chuyển. Biên số " + spch00251Header.nguonxe + " Biển số:" + spch00251Header.biensoxe;
                if(element.htttkhachhang == "2") {
                    await commonfun.ghiNhatkyNo(element.idkhachhang,null,null,element.tiencuoc, "Nợ",gc,"1");
                } else {
                    await commonfun.ghiNhatkyNo(element.idkhachhang,null,null,element.tiencuoc, "Nợ",gc,"");
                }

                let detailChuyenngoai = await Chitietchuyenngoai.findOne({_id:newDetail._id});
                await Chuyenngoai.updateOne({_id:spch00251Header.id},{$push:{listdetail:detailChuyenngoai._id}});
            }
        }
        let cn = await Chuyenngoai.findOne({_id: spch00251Header.id})
                .populate('listdetail');
        let reqlist = await Chitietchuyenngoai.find({idchuyenngoai:spch00251Header.id})
        let resData = {
            resspch00251Header: cn,
            reslistdetail: reqlist
        }
        res.status(200).send(new Response(0,"Data success !", resData));

    } else {
        let newChuyenngoai = new Chuyenngoai({
            ngaynhap: spch00251Header.ngaynhap,
            ngayvanchuyen: spch00251Header.ngayvanchuyen,
            ngaydukiengiaohang: spch00251Header.ngaydukiengiaohang,
            nguonxe: spch00251Header.nguonxe, // id nguon xe
            biensoxe: spch00251Header.biensoxe,
            sdtnguonxe: spch00251Header.sdtnguonxe,
            tentaixe: spch00251Header.tentaixe,
            sodienthoai: spch00251Header.sodienthoai,
            listdetail: [],
            status01: 0,
            status02: 0,
            status03: 0,// 
            status04: 0,
            status05: 0,
            ghichu: spch00251Header.ghichu
        });
    
        newChuyenngoai.save(async function(e){
            if (e) {
                res.status(200).send(new Response(1001,"Lỗi khi khởi tạo chuyên ngoài !", null));
            } else {
               
                // insert detail vao table chi tiêt chuyến ngoài
                let stt = 1;
                for(let element of lstdetail) {
                    let newDetail = new Chitietchuyenngoai({
                          idchuyenngoai: newChuyenngoai._id,
                          nguonxe: spch00251Header.nguonxe,
                          thongtindonhang: element.thongtindonhang,
                          diadiembochang: element.diadiembochang,  // 
                          tiencuoc:element.tiencuoc,
                          tiencuocxengoai: element.tiencuocxengoai,
                          htttxengoai: element.htttxengoai,
                          idkhachhang: element.idkhachhang,
                          htttkhachhang: element.htttkhachhang,
                          tennguoinhan: element.tennguoinhan,
                          sdtnguoinhan: element.sdtnguoinhan,
                          diachinguoinhan: element.diachinguoinhan,
                          status01: 0, // trang thai don hang. =0 chưa bóc. =1 đã bóc, =2 đã giáo
                          status02: element.status02, // 
                          status03: 0, 
                          status04: 0,
                          status05: 0,
                          ghichu: element.ghichu
                    });
                    await newDetail.save();
                    // đang ký công no xe ngoài
                    if(element.htttxengoai == "2") {
                        registerCongNoXeNgoai(
                            spch00251Header.nguonxe,
                            newDetail._id,
                            spch00251Header.biensoxe,
                            spch00251Header.tentaixe,
                            spch00251Header.sodienthoai,
                            element.tiencuocxengoai,
                            "NO",1);
                    } else {
                        registerCongNoXeNgoai(
                            spch00251Header.nguonxe,
                            newDetail._id,
                            spch00251Header.biensoxe,
                            spch00251Header.tentaixe,
                            spch00251Header.sodienthoai,
                            element.tiencuocxengoai,
                            "NO",0);
                    }

                    // đăng ký công nợ khách hàng
                    let gc = newDetail._id + " Xe ngoài vận chuyển. Mã nguồn xe " + spch00251Header.nguonxe + " Biển số:" + spch00251Header.biensoxe;
                    if(element.htttkhachhang == "2") {
                        await commonfun.ghiNhatkyNo(element.idkhachhang,null,null,element.tiencuoc, "Nợ",gc,"1");
                    } else {
                        await commonfun.ghiNhatkyNo(element.idkhachhang,null,null,element.tiencuoc, "KNợ",gc,"");
                    }
                    let detailChuyenngoai = await Chitietchuyenngoai.findOne({_id:newDetail._id});
                    reslistdetail.push(detailChuyenngoai);
                    // update listdetail trong Chuyenngoai
                    await Chuyenngoai.updateOne({_id:newChuyenngoai._id},{$push:{listdetail:detailChuyenngoai._id}});
                }
                let resData = {
                    resspch00251Header: newChuyenngoai,
                    reslistdetail: reslistdetail
                }
                res.status(200).send(new Response(0,"Create Sucess !", resData));
            }
        }) 
    }
}

// update 
exports.PostUpdateChuyenngoai = async (req,res) => {
    Chuyenngoai.updateOne({_id: req.body.id},{$set: {nguonxe: req.body.nguonxe, biensoxe: req.body.biensoxe, tentaixe: req.body.tentaixe, sodienthoai: req.body.sodienthoai, changduong: req.body.changduong}})
    .then(data => {
        console.log(data.modifiedCount + " Update Xe success " + req.body.id);
        return res.status(200).send(new Response(0,"Data sucess ", data.modifiedCount));
    }, err => {
        res.status(200).send(new Response(1001,"error Update !", null));
    })
}

// update status
exports.PostUpdateStatusChuyenngoai = async (req,res) => {
    Chuyenngoai.updateOne({_id: req.body.id},{$set: {status01: req.body.status01, status02: req.body.status02, status03: req.body.status03, status04: req.body.status04, status05: req.body.status05}})
    .then(data => {
        console.log(data.modifiedCount + " Update Xe success " + req.body.id);
        return res.status(200).send(new Response(0,"Data sucess ", data.modifiedCount));
    }, err => {
        res.status(200).send(new Response(1001,"error Update !", null));
    })
}

// delete 
exports.PostDeleteChuyenngoai = async (req,res) => {
    console.log(req);
}

// delete all 
exports.PostDeleteAllChuyenngoai = async (req,res) => {
    console.log(req);
}

// get detail 
exports.PostGetDetail = async (req,res) => {
    let cn = await Chuyenngoai.findOne({_id:req.body.id})
    let lstdetail = await Chitietchuyenngoai.find({idchuyenngoai: req.body.id});
    let reqdata = {
        resHeader: cn,
        listdetail: lstdetail
    }
    if(cn) {
        res.status(200).send(new Response(0,"data success !", reqdata));
    } else {
        res.status(200).send(new Response(1001,"error Update !", null));
    }
}

const db = require("../model");
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const _ = require('lodash');
const Chuyenngoai = db.chuyenngoai;
const Chitietchuyenngoai = db.chitietchuyenngoai;
const Congnoxengoai = db.congnoxengoai;
const Nhatkykh = db.nhatkykh;
const PNH = db.phieunhaphang;

function CongnoxengoaiDto() {
    this.id = "";
    this.soID = "";
    this.nguonxe = {};
    this.biensoxe = "";
    this.iddonhang = {};
    this.ngaynhap = "";
    this.sodienthoai = "";
    this.sohdttxn = "";
    this.sotienno = 0;
    this.tentaixe = "";
    this.status01 = 0;
    this.status02 = 0;
    this.status03 = 0;
    this.status04 = 0;
    this.status05 = 0;
    this.ghichu = "";
}

// list all 
exports.PostAll = async (req,res) => {
    let filters = req.body.filters;
    let gt = "01/01/1970";
    let lt = "01/01/2100";
    if(req.body.filters.ngaybatdau) {
        gt = req.body.filters.ngaybatdau;
    }
    if(req.body.filters.ngayketthuc) {
        lt = req.body.filters.ngayketthuc;
    }
    let sreach = {};
    sreach.ngaynhap = {$gte:new Date(gt),$lte: new Date(commonfun.fnEndSearch(lt))};
    if(filters.status01 == 0){
        sreach.sohdttxn = "";
    } 
    if(filters.status01) {
        sreach.status01 = filters.status01;
    }
    if(filters.nguonxe) {
        sreach.nguonxe = filters.nguonxe;
    }
    if(req.body.pageSize == 0 && req.body.pageNum == 0) {
        let alldata = await Congnoxengoai.find({})
        .populate('nguonxe')
        .populate('iddonhang');
        let reqdata = mergeListCnxn(alldata)
        return res.status(200).send(new Response(0,"Data sucess", reqdata));
    } else {
        let n = req.body.pageNum - 1;
        let alldata = await Congnoxengoai.find(sreach);
        let resalldata = await mergeListCnxn(alldata)
        let lst = await Congnoxengoai.find(sreach).limit(req.body.pageSize).skip(req.body.pageSize*n)
        .populate('iddonhang')
        .populate('nguonxe');
        let reslst = await mergeListCnxn(lst)
        let data = commonfun.dataReponse(resalldata,reslst,req.body.pageNum,req.body.pageSize);
        return res.status(200).send(new Response(0,"Data sucess", data));
    }
}

async function mergeListCnxn(list) {
   let listcnxn = [];
   for(let element of list) {
      let item = new CongnoxengoaiDto();
      item.id = element.id;
      item.nguonxe = element.nguonxe;
      item.biensoxe = element.biensoxe;
      item.soID = element.soID;
      item.ghichu = element.ghichu;
      item.sohdttxn = element.sohdttxn;
      item.sotienno = element.sotienno;
      item.tentaixe = element.tentaixe;
      item.sodienthoai = element.sodienthoai;
      item.ngaynhap = element.ngaynhap;
      item.status01 = element.status01;
      item.status02 = element.status02;
      item.status03 = element.status03;
      item.status04 = element.status04;
      item.status05 = element.status05;
      if(element.iddonhang == null) {
        let pnh = await PNH.findOne({soID: element.soID});
        item.iddonhang = pnh;
      } else {
        item.iddonhang = element.iddonhang;
      }
      listcnxn.push(item);
   }
   return listcnxn;
}
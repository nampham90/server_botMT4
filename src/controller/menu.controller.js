const db = require("../model");
const common = require("../common/functionCommon");
let Responses = require('../common/response');
const { find } = require("lodash");
let Response = Responses.Response
let ObjDataSC = Responses.ObjectDataSC;
const Menu = db.menu;
const Screenpc = db.screenpc;
const TMT101 = db.tmt101;

exports.getListDept = async (req,res) => {
    let lst = await Menu.find({});
    if(lst.length > 0) {
       return res.status(200).send(new Response(0,"Data sucess", lst));
    }
    return res.status(400).send(new Response(1000,"is not data Menu", null));
}

exports.addMenu = async (req, res) => {
    let newMenu = new Menu({
        menuName: req.body.menuName,
        code: req.body.code,
        orderNum: req.body.orderNum,
        menuType: req.body.menuType,
        path: req.body.path,
        visible: req.body.visible,
        status: req.body.status,
        newLinkFlag: req.body.newLinkFlag,
        icon: req.body.icon,
        alIcon: req.body.alIcon,
        fatherId: req.body.fatherId,
        id: null
    })
    newMenu.save(async function(e){
        if(e) {
           res.status(200).send(new Response(1001,"không thể lưu menu", null));
        } else {
           res.status(200).send(new Response(0,"Lưu thành công", newMenu));
        }
    })
}

exports.editMenu = async (req, res) => {
    let idupdate = req.body.id;
    if(!idupdate)  return res.status(500).send(new Response(1001,"Clien send data null", null));
    Menu.updateOne({_id: idupdate},{$set: {
        menuName: req.body.menuName,
        code: req.body.code,
        orderNum: req.body.orderNum,
        menuType: req.body.menuType,
        path: req.body.path,
        visible: req.body.visible,
        status: req.body.status,
        newLinkFlag: req.body.newLinkFlag,
        icon: req.body.icon,
        alIcon: req.body.alIcon
    }})
    .then(dataupdate => {
        return res.status(200).send(new Response(0,"Data update sucess ",idupdate));
    },err => {
        return res.status(501).send(new Response(1001,"not update null", null));
    })
}

exports.delMenu = async (req, res) => {
    let id = req.body.ids[0];
   
    let m = await Menu.findOneAndDelete({_id:id});
    if(m) {
        return res.status(200).send(new Response(0,"Data update sucess ",1));
    }
}

exports.getListMenu = async(req, res) => {
    let lst = await Menu.find({});
    let data = {
        "total": lst.length,
        "list": lst
    }
    return res.status(200).send(new Response(0,"Data sucess ",data));
}

exports.getListMenuParams = async (req,res) => {
    let lst = await Menu.find({});
    let pageNum = req.body.pageNum;
    let pageSize = req.body.pageSize;
 
    if(lst.length > 0)  {
       let commonfun = common.dataReponse(lst,lst,pageNum,pageSize);
       res.status(200).send(new Response(0,"data sucess !", commonfun));
    } else {
       res.status(500).send(new Response(1001,"not all data phòng ban !", null));
    }
}

exports.getDetailMenu = async(req,res)=> {
   let id = req.body.menuId;
   let detail = await Menu.findOne({_id: id});
   if(!detail)  return res.status(500).send(new Response(1000,"Data null ",null));
   return res.status(200).send(new Response(0,"Data sucess ",detail));
}

exports.getDetailMenuFromUrl = async (req,res) => {
  let lang = req.lang;
  let m = await Menu.findOne({path: req.body.url});
  if(m) {
    let lst = await Screenpc.find({idmenu:m._id,lang: lang});
    let tmt101 = await TMT101.findOne({urldisplayid: req.body.url});
    let idyoutube = "";
    if(tmt101) {
        idyoutube = tmt101['idyoutube'];
    }
    let stt = 1;
    let lstdata = []
    for(let element of lst) {
        let obj = new ObjDataSC(element.vitri,element.title1,element.title2, idyoutube);
        lstdata.push(obj);
        stt++;
    }
    lstdata = lstdata.sort((a, b) => a.vitri - b.vitri);
    return res.status(200).send(new Response(0,"data sucess", lstdata));
  }
  return res.status(200).send(new Response(0,"data rong", []));
}

const db = require("../model");
let Responses = require('../common/response');
let Response = Responses.Response
let commonfun = require('../common/functionCommon');
const Role = db.role;
const User = db.user;
const { ObjectId } = require('mongodb');


exports.getListRole = async(req,res) => {
    let n = req.body.pageNum - 1;
    let alldata = await Role.find(req.body.filters);
    let lst = await Role.find(req.body.filters).limit(req.body.pageSize).skip(req.body.pageSize*n);
    let data = commonfun.dataReponse(alldata,lst,req.body.pageNum,req.body.pageSize);
    return res.status(200).send(new Response(0,"Data sucess", data));
}

exports.getSearchAllRole = async(req,res) => {
    let lst = await Role.find({});
    return res.status(200).send(new Response(0,"Data sucess", lst));
}

exports.GetDetailRole = async (req,res)=>{
    let idUser = req.userID;
    let user = await User.findOne({_id: idUser});
    if(user) {
        const stringArray = user.role_id.map(objId => objId.toString());
        let role = await Role.findOne({_id: stringArray[0]});
        return res.status(200).send(new Response(0,"Data success !", role));
    } else {
       return res.status(200).send(new Response(0,"Data null", null));
    }

   
   
}

exports.AddDetailRole = async (req,res)=>{
    let role = await Role.findOne({rolename: req.body.rolename});
    if (role) {
        return res.status(200).send(new Response(1001,"Role đã tồn tại", null));
    } else {
        let newRole = new Role({
            rolename: req.body.rolename,
            mota: req.body.mota,
            dacquyen: []
        });
        newRole.save(async function(e){
            if(e){
                return res.status(200).send(new Response(1002,"Insert erorr ", null));
            } else {
                return res.status(200).send(new Response(0, "Data sucess", newRole));
            }
        })
    }
}

exports.EditDetailRole = async (req,res)=>{
    
}

exports.DelDetailRole = async (req,res)=>{
    
}

exports.GetpermissionRole = async (req,res)=>{
    let id = req.params.id;
    let role = await Role.findOne({_id: id}).populate("dacquyen");
    let list = [];
    for(let element of role.dacquyen){
        list.push(element.code);
    }
    if(role) {
        return res.status(200).send(new Response(0,"Data sucess", list));
    }else {
        return res.status(500).send(new Response(1001,"Data null", null));
    }
}

exports.PutpermissionRole = async (req,res)=>{
    let updatePermission = await Role.updateOne({_id: req.body.roleId},{$set: {dacquyen:req.body.permissionIds}});
    if(updatePermission.modifiedCount == 1) {
        res.status(200).send(new Response(0, "update thang cong ",1));
    }else {
        res.status(500).send(new Response(1001, "not update data ",null));
    }
    
}


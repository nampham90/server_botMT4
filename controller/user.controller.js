const db = require("../model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let menus = require('../common/menu');
let commonfun = require('../common/functionCommon');
let Responses = require('../common/response');
let Response = Responses.Response;
let DataResponse = Responses.DataResponse;
const User = db.user;
const Role = db.role;
const Menu = db.menu;
const { registerValidator } = require('./../validations/auth');

exports.getAllUser = async (req,res) => {
    let lst = await User.find({});
    if(lst.length > 0) {
        let data = commonfun.dataReponse(lst,req.body.pageNum,req.body.pageSize);
        res.status(200).send(new Response(0,"data sucess",data));
    }else {
        res.status(500).send(new Response(1000,"data null",null));
    }
}

exports.getDetailUser = async(req,res) => {
    let id = req.params.id;
    let user = await User.findOne({_id:id});
    if(!user) return res.status(500).send(new Response(1001,"User không tồn tại !",null));
    return res.status(200).send(new Response(0,"Data sucess ", user));
}

exports.editDetailUser =async (req,res) => {
    console.log(req);
}


exports.register =  async(req,res)=>{
    const { error } = registerValidator(req.body);
    if (error){
        let response = new Response(1010,error.details[0].message,null);
        return res.status(423).send(response);
    } 
    const checkEmailExist = await User.findOne({ email: req.body.email });
    if (checkEmailExist) {
        let response = new Response(1010,'Email is exist',null);
        return res.status(422).send(response);
    } 
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    let role = "";
    if(req.body.email == "devadmin@gmail.com") {
        role = await Role.findOne({rolename: "Dev"});
    }else {
        role = await Role.findOne({rolename: "User"});
    }
    console.log(role._id)
    if (!role) {
        let response = new Response(1010,'Role is exist',null);
        return res.status(422).send(response);
    } 

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        role:[],
        account_id:[]
    });

    try {
        const newUser = await user.save();
        await User.updateOne({email:newUser.email},{$push:{role_id:role._id}});
        await res.send(newUser);
    } catch (err) {
        res.status(400).send(err);
    }
}

exports.login =  async(req,res)=>{
    const user = await User.findOne({email: req.body.email});
    if (!user) {
        let response = new Response(1010,'Email chưa đăng ký !',null);
        return res.status(422).send(response);
    } 
    const checkPassword = await bcrypt.compare(req.body.password, user.password);
    console.log(checkPassword);
    if (!checkPassword){
        let response = new Response(1010,'Password không đúng !',null);
        return res.status(422).send(response);
    } 

    let arraycode = "";
    let num =0;
    if(user.menulist.length > 0) {
        user.menulist.forEach(async function(m){
            if(num > 0){
                arraycode = arraycode + ","
            }
            arraycode = arraycode + m.code;
            num ++;
        })
    }
    const token = await jwt.sign({_id: user._id, rol: arraycode}, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 * 24 });
    return res.status(200).send(new Response(0,'Login successfully !',token));
}

exports.getRoles = async(req, res) => {
   let listRole = await Role.find({});
   if(listRole.length == 0) {
     let response = new Response(1010, "Role chưa được khởi tạo !", null)
     return res.status(422).send(response);
   }
   let response = new Response(0, "Data sucess !", listRole)
   return res.status(200).send(response);
}

exports.getMenu = async(req, res) => {
   let user = await User.findOne({_id: req.userID});
   if(user.menulist.length > 0){
       return res.status(200).send(new Response(0,"Data sucess ",user.menulist));
   }
   return res.status(422).send(new Response(1010,"not data Menu",null));
}

exports.getListMenu = async(req, res) => {
    let user = await User.findOne({_id: req.userID});
    if(!user) return res.status(400).send(new Response(1000,"Bạn không có quyền truy cập vào Module này", null));
    if(user.menulist.length > 0){
        let data = {
            "total": user.menulist.length,
            "list" : user.menulist
        }
        return res.status(200).send(new Response(0,"Data sucess ",data));
    } else {
       return res.status(400).send(new Response(1001,"Menu Của Bạn Chưa được khởi tạo", null));
    }
}

exports.getDetailMenu= async(req,res)=> {
    let menuid = req.body.menuId;
    if (menuid) {
        let user = await User.findOne({_id: req.userID});
        if(user.menulist.length > 0) {
            let check = false;
            let menusend = {};
            user.menulist.forEach(async function(m){
               if(m._id == menuid){
                  check = true;
                  menusend = m;
               }
            })
            if(check === true) {
                return  res.status(200).send(new Response(0, " data succss", menusend));
            }else{
                return  res.status(422).send(new Response(1010, "Id Menu khong ton tai ",null));
            }
        } else{
            return  res.status(422).send(new Response(1010, "menu khong ton tai",null));
        }
    }else {
      return  res.status(500).send(new Response(1050, "clien send data null",null));
    }   
}

exports.deleteMenu = async (req, res) => {
    let ids = req.body.ids;
    if (ids.length == 0 || ids == null) return res.status(500).send(new Response(1050, "clien send data null",null));
    ids.forEach(async function(id){
       let lst = await commonfun.checkAndremoveIdMenu(req.userID,id);
       await User.updateOne({_id: req.userID},{$set: {menulist:lst}});
       console.log(lst.length);
    //    promise.then(data=>{console.log("count new list :"+data.length)})
    //    .catch(err =>{console.log("errol remove item list")})
    })


    
    
}
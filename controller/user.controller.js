const db = require("../model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let menus = require('../common/menu');

let Responses = require('../common/response');
let Response = Responses.Response;
const User = db.user;
const Role = db.role;
const Menu = db.menu;
const { registerValidator } = require('./../validations/auth');

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
                arraycode += ","
            }
            arraycode += m.code;
            num ++;
        })
    }
    const token = await jwt.sign({_id: user._id, rol: arraycode}, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 * 24 });
    let response = new Response(0,'Login successfully !',token);
    return res.status(200).send(response);
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
//    let menu = menus.getMenu();
//    let menuDB = await Menu.find({});
//    User.updateOne({_id: req.userID},{$set:{menulist:menuDB}})
//    .then(data =>{
//       console.log(data.modifiedCount + " update Menu user " + User.menulist);
//   })
//   .catch(err=>{
//       console.log(err.message);
//   })  
//    if(menu.length > 0) {
//      let user = await User.findOne({_id: req.userID});
//      if(user.menulist.length == 0) {
//         menu.forEach(async function(m){
//             User.updateOne({_id: req.userID},{$push:{menulist:m}})
//              .then(data =>{
//                 console.log(data.modifiedCount + " Add new menu " + m.id);
//             })
//             .catch(err=>{
//                 console.log(err.message);
//             })  
//         });
//      }
//      let data = {
//         "total" : user.menulist.length,
//         "list" : user.menulist
//      }
//      let response = new Response(0, "sucess data !", data);
//      return  res.status(200).send(response);
//    }
   let user = await User.findOne({_id: req.userID});
   if(user.menulist.length > 0){
       return res.status(422).send(new Response(0,"Data sucess ",user.menulist));
   }
   return res.status(422).send(new Response(1010,"not data Menu",null));
}

exports.getDetailMenu= async(req,res)=> {
    console.log(req.body);
    let menuid = req.body.menuId;
    if (menuid) {
        let user = await User.findOne({_id: req.userID});
        if(user.menulist.length > 0) {
            user.menulist.forEach(async function(m){
               if(m.id === menuid){
                  
               }
            })
        }
    }
    res.status(200).send(new Response(0, " data succss", req.userID));
}
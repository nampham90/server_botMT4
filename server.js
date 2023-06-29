const createError = require('http-errors');
const dotenv = require('dotenv');
const path = require('path');
const express = require("express");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dbCon = require('./common/DBConnect');
var _ = require('lodash');
const bcrypt = require('bcryptjs');
const cors = require('cors')
const app = express();
app.use(cors());
dotenv.config();
//connect database------------------------------
const db = require("./model");
const Role = db.role;
const User = db.user;


Role.find({}).then(res => {
  let lst = res;
  if(lst.length == 0){
    let newRoleAdmin =new Role({rolename: "Admin",mota: "Role Admin",dacquyen:[]});
    let newRoleUser =new Role({rolename: "User",mota: "Role User",dacquyen:[]});
    let newRoleDev =new Role({rolename: "Dev",mota: "Role Dev",dacquyen:[]});
    newRoleAdmin.save(async function(e){
      if(e){
        console.log(e.message);
      }else {
        console.log("Save role admin ");
        let listIdrole = [];
        let r = await Role.findOne({rolename:"Admin"});
        listIdrole.push(r._id);
        User.find({}).then(async data => {
          let lst = data;
          if(lst.length == 0){
            let dataNow = _.now()
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash("A123456", salt);
            let newUser = new User({
                name: "Admin",
                available: true,
                sex: 1,
                email: "admin@gmail.com",
                dienthoai: "0909999999",
                zalo: "0909999999",
                password:hashPassword,
                role_id: listIdrole,
                account_id: [],
                menulist: [],
                phongban_id: '',
                lastLoginTime:dataNow
            });
            newUser.save(async function(e){
                if(e){
                  console.log("not Save  user " + e);
                }else {
                  console.log("Save  user ");
                }
            })
          }
        })
      }
    });
    newRoleUser.save(async function(e){
      if(e){}else {
        console.log("Save role user ");
      }
    });
    newRoleDev.save(async function(e){
      if(e){}else {
        console.log("Save role Dev ");
      }
    });
  }
},err =>{
  console.log("err. "+ err.message)
})


const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
// master
require("./routers/user.route")(app);
require("./routers/role.route")(app);
require("./routers/menu.route")(app);
require("./routers/phongban.route")(app);
require("./routers/screenpc.route")(app);
require("./routers/common.route")(app);
require("./routers/nhatkyhethong.route")(app);

// master
require("./routers/tmt101.route")(app);
require("./routers/tmt010_file.route")(app);

// khochung
require("./khochungrouters/kho.route")(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 505);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;
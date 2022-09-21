const createError = require('http-errors');
const dotenv = require('dotenv');
const path = require('path');
const express = require("express");
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require('cors')
const app = express();
app.use(cors());
dotenv.config();
//connect database------------------------------
const db = require("./model");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
const Role = db.role;
const Menu = db.menu;
const User = db.user;
let menus = require('./common/menu');
let menu = menus.getMenu();
// Menu.remove({}).then(data => {
//    console.log(data);
// },err => {
//    console.log(err);
// });
// let menu = menus.getMenu();
//    User.updateOne({_id: req.userID},{$set:{menulist:menu}})
//    .then(data =>{
//       console.log(data.modifiedCount + " update Menu user " + User.menulist);
//   })

// menu.forEach(async function(m){
//     let newMenu = new Menu({
//       id: m.id,
//       menuName: m.menuName,
//       code: m.code,
//       fatherId: m.fatherId,
//       orderNum: m.orderNum,
//       path: m.path,
//       menuType: m.menuType,
//       visible: m.visible,
//       status: m.status,
//       icon: m.icon,
//       alIcon: m.alIcon,
//       newLinkFlag: m.newLinkFlag
//     })
//     newMenu.save(async function(e){
//       if(e){}
//       else {
//           console.log(newMenu._id);
//       }
//     });
// });
Menu.find({})
.then(data => {
   console.log(data);
},err => {
   console.log(err);
});

Role.find({}).then(res => {
  let lst = res;
  if(lst.length == 0){
    let newRoleAdmin =new Role({rolename: "Admin"});
    let newRoleUser =new Role({rolename: "User"});
    let newRoleDev =new Role({rolename: "Dev"});
    newRoleAdmin.save(async function(e){
      if(e){
        console.log(e.message);
      }else {
        console.log("Save role admin ");
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
app.use(express.static(path.join(__dirname, 'public')));
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

require("./routers/order.route")(app);
require("./routers/account.route")(app);
require("./routers/user.route")(app);
require("./routers/lenhcho.route")(app);

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
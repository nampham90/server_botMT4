const express = require("express");
const dotenv = require("dotenv")
dotenv.config();

const app = express();

var POST = process.env.POST | 5000;
app.listen(POST);


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


const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());


const order = require("./model/order");

const axios = require("axios");

require("./routers/order.route")(app);
require("./routers/account.route")(app);
require("./routers/lenhcho.route")(app);



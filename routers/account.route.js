module.exports = app => {
    const Account = require("../controller/account.controller");
    const route = require("express").Router();

    route.get("/all",Account.findAll);

    app.use("/account",route);
}
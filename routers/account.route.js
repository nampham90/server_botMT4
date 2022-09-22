module.exports = app => {
    const Account = require("../controller/account.controller");
    const route = require("express").Router();
    const verifyToken = require('./../middlewares/verifyToken');

    route.get("/all",verifyToken,Account.findAll);

    app.use("/api/account",route);
}
module.exports = app => {
    const Role = require("../controller/role.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    route.get("/ant100SearchAllRole",verifyToken,Role.getListRole);

    app.use("/api/role",route);
}
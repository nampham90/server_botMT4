module.exports = app => {
    const Role = require("../controller/role.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    route.post("/ant100SearchAllRole",Role.getListRole);
    route.get("/ant100GetSearchAllRole",verifyToken,Role.getSearchAllRole)
    route.get("/ant100GetDetailRole/:id",verifyToken,Role.GetDetailRole);
    route.put("/ant100EditDetailRole",verifyToken,Role.EditDetailRole);
    route.post("/ant100AddDetailRole",verifyToken,Role.AddDetailRole);
    route.post("/ant100DelDetailRole",verifyToken,Role.DelDetailRole);
    route.get("/ant100GetpermissionRole/:id",verifyToken,Role.GetpermissionRole);
    route.put("/ant100PutpermissionRole",verifyToken,Role.PutpermissionRole);
    app.use("/api/role",route);
}
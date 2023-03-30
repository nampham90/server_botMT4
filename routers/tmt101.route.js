module.exports = app => {
    const TMT101 = require("../controller/tmt101.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    route.post("/tmt101Ant100Create",verifyToken,TMT101.Create);
    route.post("/tmt101Ant100Update",verifyToken,TMT101.Create);
    route.post("/tmt101Ant100Detail",verifyToken,TMT101.Detail);
    route.post("/tmt101Ant100Searchparam",verifyToken,TMT101.searchParams);
    route.post("/tmt101Ant100FindAll",verifyToken,TMT101.getLists);

    app.use("/api/tmt101",route);
}
module.exports = app => {
    const TMT060 = require("../controller/tmt060_dichvuthuengoai.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    route.post("/tmt060Ant100getAll",verifyToken,TMT060.getAll);
    route.post("/tmt060Ant100add",verifyToken,TMT060.add);
    route.post("/tmt060Ant100delete",verifyToken,TMT060.delete);
    route.post("/tmt060Ant100update",verifyToken,TMT060.update);

    app.use("/api/tmt060",route);
}
module.exports = app => {
    const TMT061 = require("../controller/tmt061_congnodichvuthuengoai.controller");
    const route = require("express").Router();
    const verifyToken = require('../middlewares/verifyToken');

    route.post("/tmt061Ant100getAll",verifyToken,TMT061.getAll);
    route.post("/tmt061Ant100Checkout",verifyToken,TMT061.checkout);
    
    route.post("/tmt061Ant100update",verifyToken,TMT061.update);

    app.use("/api/tmt061",route);
}
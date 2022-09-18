module.exports = app =>{
    var order = require("../controller/order.controller");
    const verifyToken = require('./../middlewares/verifyToken');
    const router = require("express").Router();

    router.post("/",order.create);
    router.get("/all",order.findAll);
    router.get("/removeall",order.removeAll);
    router.post("/runorder",verifyToken,order.findOrderRunAcc);
    router.post("/offinday",verifyToken,order.findOffinDay);

    app.use("/orders",router);

}
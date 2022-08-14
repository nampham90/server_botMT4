module.exports = app =>{
    var order = require("../controller/order.controller");

    const router = require("express").Router();

    router.post("/",order.create);
    router.get("/all",order.findAll);
    router.get("/removeall",order.removeAll);

    app.use("/orders",router);

}
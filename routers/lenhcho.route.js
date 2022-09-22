module.exports = app => {
    const Lenhcho = require("../controller/lenhcho.controller");
    const route = require("express").Router();

    route.get("/all",Lenhcho.findAll);

    app.use("/api/lenhcho",route);
}
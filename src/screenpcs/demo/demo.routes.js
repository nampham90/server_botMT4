
const Router = require("express").Router;
const DemoController = require('./demo.controller');

class Spcm00101Routes {
    constructor() {
        this.router = Router();
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post("/login", DemoController.prototype.create)
    }
}

module.exports = new Spcm00101Routes().router;
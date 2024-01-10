const Router = require("express").Router;
const ApiController = require("./api.controller");
const verifyToken = require('../../../middlewares/verifyToken');

class ApiRoutes {
    constructor(){
        this.router = Router();
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post('/apiprovinces',verifyToken, ApiController.findAllProvinces)

    }
}

module.exports = new ApiRoutes().router;
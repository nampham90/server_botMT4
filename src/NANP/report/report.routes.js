const { Router } = require("express");
const reportController = require("./report.controller");


class ReportRouter {
    constructor() {
        this.router = Router();
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post('/inbaogiareport', reportController.inbaogiaReport);

    }
}

module.exports = new ReportRouter().router
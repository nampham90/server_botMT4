module.exports = app => {
    const Spkh00201 = require("../controller/spkh00201.controller");
    const route = require("express").Router();
    const verifyToken = require('../../middlewares/verifyToken');

    route.post('/spkh00201Ant100getAll', verifyToken, Spkh00201.searchListCongNo);

    app.use("/api/spkh00201",route);
}
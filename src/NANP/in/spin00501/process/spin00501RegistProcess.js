const AbstractProcess = require("../../../../common/abstract/AbstractProcess");
const { Op } = require('sequelize');
const PageInfo = require("../../../../common/pageInfo/pageInfo");
const moment = require('moment');
class Spin00501RegistProcess extends AbstractProcess {
    constructor() {
        super();
    }

    async register(req) {
        return this.execute(req);
    }

    async process(req) {
        // bắt đầu hỏi
        // truy vấn DB
    }
}
module.exports = Spin00501RegistProcess;
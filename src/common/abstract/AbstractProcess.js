const Database = require('../../DB/database');
const logToFile = require('../logFile');
class AbstractProcess {
    constructor() {
         this.db = new Database();
         this.sequelize = this.db.sequelize;
         this.models = this.db.models;
    }

    async executeModel(request ,model) {
        try {
            return await this.process(request, model);
        } catch (error) {
            logToFile(error);
            throw new Error("Error System: "+ error);
        }

    }

    async execute(request) {
        try {
            return await this.process(request);
        } catch (error) {
            logToFile(error);
            throw new Error("Error System: "+ error);
        }
    }

    async process(request) {}
}

module.exports = AbstractProcess;
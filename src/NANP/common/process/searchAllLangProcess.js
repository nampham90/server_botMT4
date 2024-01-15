const AbstractProcess = require("../../../common/abstract/AbstractProcess");

class SearchAllLangProcess extends AbstractProcess {
    constructor(){
        super()
    }

    async searchAll(req, model) {
        return this.executeModel(req, model);
    }

    async process(req, model) {
        const lstRole = await this.models[model].findAll({where: {lang: req.lang}});
        return lstRole;
    }
}

module.exports = SearchAllLangProcess;
const AbstractControllerAPI = require("../../../common/abstract/AbstractControllerAPI");
const Result = require("../../../common/result/Result");
const SearchAllProcess = require("../../common/process/searchAllProcess");


class Tmt171Controller extends AbstractControllerAPI {
    async findAll(req,res) {
        await super.execute(res, async () => {
            const searchAll = new SearchAllProcess();
            const result = await searchAll.searchAll(req, "Tmt171Paymethd");
            return Result.success(result);
        })
    }
}

module.exports = new Tmt171Controller();
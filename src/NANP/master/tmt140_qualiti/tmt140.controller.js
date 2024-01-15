const AbstractControllerAPI = require("../../../common/abstract/AbstractControllerAPI");
const Result = require("../../../common/result/Result");
const SearchAllProcess = require("../../common/process/searchAllProcess");


class Tmt140QualityController extends AbstractControllerAPI {

    async findAll(req,res) {
        await super.execute(res, async () => {
            const searchAll = new SearchAllProcess();
            const result = await searchAll.executeModel(req, 'Tmt140Quality');
            return Result.success(result);
        })
    }

}

module.exports = new Tmt140QualityController();
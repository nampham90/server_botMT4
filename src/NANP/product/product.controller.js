const AbstractControllerAPI = require("../../common/abstract/AbstractControllerAPI");
const Result = require("../../common/result/Result");
const SearchAllLangProcess = require("../common/process/searchAllLangProcess");


class ProductController extends AbstractControllerAPI {

    async categories(req, res) {
        await super.execute(res, async () => {
            const searchAllLang = new SearchAllLangProcess();
            const result = await searchAllLang.executeModel(req, 'ProductCategory');
            return Result.success(result);
        })
    }

}

module.exports = new ProductController();
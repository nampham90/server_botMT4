const AbstractControllerAPI = require("../../../common/abstract/AbstractControllerAPI");
const axios = require('axios');
const Result = require("../../../common/result/Result");
const providers = require("../../../common/providers");
class ApiProvincesController extends AbstractControllerAPI {


    async findAllProvinces(req, res) {
        await super.execute(res, async() => {
            try {
                let result = await axios.get('https://provinces.open-api.vn/api/?depth=2');
                if(result) return Result.success(result.data);
            } catch (error) {
                return Result.success(providers)
            }
        })
    }
}

module.exports = new ApiProvincesController();
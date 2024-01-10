const AbstractControllerAPI = require("../../../common/abstract/AbstractControllerAPI");
const axios = require('axios');
const Result = require("../../../common/result/Result");

class ApiProvincesController extends AbstractControllerAPI {


    async findAllProvinces(req, res) {
        await super.execute(res, async() => {
            let result = await axios.get('https://provinces.open-api.vn/api/?depth=2');
            return Result.success(result.data);
        })
    }
}

module.exports = new ApiProvincesController();
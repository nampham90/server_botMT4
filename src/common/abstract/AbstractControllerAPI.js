const logToFile = require('../logFile');
const { ErrorCode } = require('../enums/ErrorCode');
const Result = require('../result/Result');

class AbstractControllerAPI {
    constructor() {}

    async execute(res, callback) {
        try {
            const result = await callback();
            res.status(200).send(result);
        } catch (error) {
            res.status(200).send(Result.failureCode(ErrorCode.SYS_ERR_GLOBAL));
            console.log(error);
            logToFile(error);
        }
    }
}
module.exports = AbstractControllerAPI;
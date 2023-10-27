const { ErrorCodeEnum } = require("../enums/ErrorCode");
const CommonConstants = require("../result/CommonConstants")

 class Result {
    constructor(code, msg, data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    static success() {
        return new Result(CommonConstants.ResultCodeStatus.RESULT_SUCCESS, CommonConstants.ResultCodeMessage.RESULT_SUCCESS_MESSAGE);
    }

    static success(data) {
        return new Result(CommonConstants.ResultCodeStatus.RESULT_SUCCESS, CommonConstants.ResultCodeMessage.RESULT_SUCCESS_MESSAGE, data);
    }

    static failure() {
        return new Result(CommonConstants.ResultCodeStatus.RESULT_FAILURE, CommonConstants.ResultCodeMessage.RESULT_FAILURE_MESSAGE);
    }

    static failureCode(arrayError) {
        let errorCodeEnum = new ErrorCodeEnum(arrayError)
        return new Result(errorCodeEnum.getCode, errorCodeEnum.getMessage());
    }

    static failure(code, message) {
        return new Result(code, message);
    }
}

module.exports = Result;


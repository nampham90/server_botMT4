const { ErrorCode } = require("../common/enums/ErrorCode");
const Result = require("../common/result/Result");


function handleJsonError(error, req, res, next) {
  if (error instanceof SyntaxError && 'body' in error) {
    return res.status(200).send(Result.failure(ErrorCode.SYS_ERR_JSON));
  } else {
    next();
  }
}

module.exports = handleJsonError;
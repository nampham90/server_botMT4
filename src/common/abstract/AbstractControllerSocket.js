const logToFile = require('../logFile');
const { ErrorCode } = require('../enums/ErrorCode');
const Result = require('../result/Result');

class AbstractControllerSocket {
    constructor() {}

    async execute(route,socket, callback) {
        try {
            const result = await callback();
            socket.emit(route, result);
        } catch (error) {
            _io.emit(route, Result.failureCode(ErrorCode.SYS_ERR_GLOBAL));
            console.log(error);
            logToFile(error);
        }
    }
}
module.exports = AbstractControllerSocket;
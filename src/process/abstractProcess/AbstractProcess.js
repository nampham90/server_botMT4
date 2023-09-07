const logToFile = require('../../common/logFile');
class AbstractProcess {
  constructor(database) {
    this.database = database;
    this.transaction = null;
  }

  async start() {
    this.transaction = await this.database.startSession();
    this.transaction.startTransaction();
  }

  async commit() {
    await this.transaction.commitTransaction();
    this.transaction.endSession();
  }

  async rollback() {
    await this.transaction.abortTransaction();
    this.transaction.endSession();
  }

  async execute(db,req,session) {
    try {
      const result = await this.process(db,req,session);
      return result;
    } catch (error) {
      logToFile(error.message);
      await this.rollback();
      throw error;
    }
  }

  async process(db,req,session) {
    let res = "res";
    return res;
  }
}
module.exports = AbstractProcess;
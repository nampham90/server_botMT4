const logToFile = require('../../common/logFile');
class Transaction {
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

  async execute(db,req) {
    try {
      await this.start();
      const result = await this.process(db,req);
      await this.commit();
      return result;
    } catch (error) {
      logToFile(error.message);
      await this.rollback();
      throw error;
    }
  }

  async process(db,req) {
    let res = "res";
    return res;
  }
}
module.exports = Transaction;
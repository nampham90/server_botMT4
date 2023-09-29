const logToFile = require('../../common/logFile');
const mysql = require('mysql2/promise');

class AbstractMysqlProcess {

  constructor(databaseConfig) {
    this.databaseConfig = databaseConfig;
    this.connection = null;
    this.transaction = null;
  }

  async start() {
    this.connection = await mysql.createConnection(this.databaseConfig);
    this.transaction = await this.connection.beginTransaction();
  }

  async commit() {
    await this.connection.commit();
  }

  async rollback() {
    await this.connection.rollback();
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
    } finally {
        if (this.connection) {
            this.connection.end(); // Đóng kết nối sau khi hoàn thành giao dịch
        }
    }
  }

  async process(db,req) {
    let res = "res";
    return res;
  }
}
module.exports = AbstractMysqlProcess;
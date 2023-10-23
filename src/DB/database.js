const { Sequelize } = require('sequelize');
const Logger = require('../common/logFile');
const dotenv = require('dotenv');
dotenv.config();
const MenuModel = require('../DB/model/menu');
class Database {
  constructor() {
    this.host = process.env.MSHOST,
    this.port = process.env.MSPORT,
    this.user = process.env.MSUSER,
    this.password = process.env.MSPASSWORD,
    this.database = process.env.MSDATABASE

    this.sequelize = new Sequelize(this.database, this.user, this.password, {
      host: this.host,
      port: this.port,
      dialect: 'mysql', // Chọn loại cơ sở dữ liệu bạn đang sử dụng (mysql, postgres, sqlite, etc.)
      logging: (msg) => {
        Logger(msg);
      }, // Tắt log các câu lệnh SQL nếu bạn không cần chúng
    });
    
    this.models = {
        "sys_menu" : MenuModel
    }; // Chứa các mô hình (models) của cơ sở dữ liệu
   // this.connect();
    this.modelsdf();
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log('Kết nối cơ sở dữ liệu thành công');
      
    } catch (error) {
      console.error('Lỗi kết nối cơ sở dữ liệu:', error);
    }
  }

  modelsdf() {
    this.defineModel('sys_menu', MenuModel);
  }

  defineModel(modelName, modelDefinition) {
    this.models[modelName] = modelDefinition(this.sequelize); // Gọi hàm truyền vào để định nghĩa mô hình
  }

  associateModels() {
    // Định nghĩa các quan hệ (associations) giữa các mô hình
    // Ví dụ:
    // this.models.User.hasMany(this.models.Post);
    // this.models.Post.belongsTo(this.models.User);
  }

  async sync() {
    // Đồng bộ hóa cơ sở dữ liệu với các mô hình đã định nghĩa
    await this.sequelize.sync();
    console.log('Đã đồng bộ hóa cơ sở dữ liệu');
  }
}

module.exports = Database;
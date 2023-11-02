const { Sequelize } = require('sequelize');
const Logger = require('../common/logFile');
const dotenv = require('dotenv');
dotenv.config();
const MenuModel = require('./model/system/menu');
const UserModel = require('./model/system/user');
const RoleModel = require('./model/system/role');
const DepartmentModel = require('./model/system/department');
const TMT340FORMITEMNMModel = require('../DB/model/master/tmt340_formItemnm');
const TMT341FILEModel = require('../DB/model/master/tmt341_file');

class Database {
  constructor() {
    this.host = process.env.MSHOSTCTY,
    this.port = process.env.MSPORTCTY,
    this.user = process.env.MSUSERCTY,
    this.password = process.env.MSPASSWORDCTY,
    this.database = process.env.MSDATABASECTY

    this.sequelize = new Sequelize(this.database, this.user, this.password, {
      host: this.host,
      port: this.port,
      dialect: 'mysql', // Chọn loại cơ sở dữ liệu bạn đang sử dụng (mysql, postgres, sqlite, etc.)
      logging: (msg) => {
        Logger(msg);
      }, // Tắt log các câu lệnh SQL nếu bạn không cần chúng
    });
    
    this.models = {
        "sys_menu" : MenuModel,
        "sys_user": UserModel,
        "sys_role": RoleModel,
        "sys_department": DepartmentModel,

        // table maste
        "TMT340FORMITEMNM": TMT340FORMITEMNMModel,
        "TMT341FILE":TMT341FILEModel
    }; // Chứa các mô hình (models) của cơ sở dữ liệu
    //this.connect();
    this.modelsdf();
    this.associateModels();
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
    this.defineModel('sys_user', UserModel);
    this.defineModel('sys_role', RoleModel);
    this.defineModel('sys_department', DepartmentModel);
    this.defineModel('TMT341FILE', TMT341FILEModel);
    this.defineModel('TMT340FORMITEMNM', TMT340FORMITEMNMModel);
  }

  defineModel(modelName, modelDefinition) {
    this.models[modelName] = modelDefinition(this.sequelize); // Gọi hàm truyền vào để định nghĩa mô hình
  }

  associateModels() {
    //this.models.TMT341FILE.drop();
    // Định nghĩa các quan hệ (associations) giữa các mô hình
    // Ví dụ:
    // this.models.User.hasMany(this.models.Post);
    // this.models.Post.belongsTo(this.models.User);
    // quan he nhieu nhieu . user role
    this.models.sys_user.belongsToMany(this.models.sys_role, {through: 'user_role'});
    this.models.sys_role.belongsToMany(this.models.sys_user, {through: 'user_role'});

    // quan he 1 nhieu . 1 department co nhieu user
    this.models.sys_department.hasMany(this.models.sys_user, {foreignKey: 'phongban_id'});
    this.models.sys_user.belongsTo(this.models.sys_department);

    // quan he nhieu nhieu: role - menu
    this.models.sys_menu.belongsToMany(this.models.sys_role, {through: 'role_menu'});
    this.models.sys_role.belongsToMany(this.models.sys_menu, {through: 'role_menu'});

    // quan hẹ 1 nhiêu : menu voi dữ liệu màn hình tmt340
    this.models.sys_menu.hasMany(this.models.TMT340FORMITEMNM, {foreignKey: 'menu_id'});
    this.models.TMT340FORMITEMNM.belongsTo(this.models.sys_menu);

    // quan hẹ 1 nhiêu : 1 user sử dụng nhiều file : tmt341_file
    this.models.sys_user.hasMany(this.models.TMT341FILE, {foreignKey: 'user_id'});
    this.models.TMT341FILE.belongsTo(this.models.sys_user);
    
    this.models.TMT341FILE.hasOne(this.models.sys_user, {
      foreignKey: 'avatar'
    })

  }

  async sync() {
    // Đồng bộ hóa cơ sở dữ liệu với các mô hình đã định nghĩa
    await this.sequelize.sync();
    console.log('Đã đồng bộ hóa cơ sở dữ liệu');
  }
}

module.exports = Database;
const { Sequelize } = require('sequelize');
const Logger = require('../common/logFile');
const dotenv = require('dotenv');
dotenv.config();
// system
const MenuModel = require('./model/system/menu');
const UserModel = require('./model/system/user');
const RoleModel = require('./model/system/role');
const DepartmentModel = require('./model/system/department');
// product
const productModel = require('./model/product/product.model');
const prodcutcategoryModel = require('./model/product/productcategory.model');
const productvariationModel = require('./model/product/productvariation.model');
const productcolorModel = require('./model/product/productcolor.model');
const productsizeModel = require('./model/product/productsize.model');
//tmt
const tmt120_branchModel = require('./model/master/tmt120_branch.model');
const TMT340FORMITEMNMModel = require('../DB/model/master/tmt340_formItemnm');
const TMT341FILEModel = require('../DB/model/master/tmt341_file');
const Tmt050Name = require('../DB/model/master/tmt050_name.model');
const tmt170_delimthd = require('./model/master/tmt170_delimthd');
const tmt171_paymethd = require('./model/master/tmt171_paymethd');
//tcc
const tcc030_seqno = require('../DB/model/tcc/tcc030_seqno.model');
//tot
const tot010_stsModel = require('./model/out/tot010_sts.model');
const tot020_ordhedModel = require('./model/out/tot020_ordhed.model');
const tot040_orddtlModel = require('./model/out/tot040_orddtl.model');

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
        // system
        "sys_menu" : MenuModel,
        "sys_user": UserModel,
        "sys_role": RoleModel,
        "sys_department": DepartmentModel,

        // table maste
        "TMT340FORMITEMNM": TMT340FORMITEMNMModel,
        "TMT341FILE":TMT341FILEModel,
        "Tmt120Branch": tmt120_branchModel,
        "Tmt050Name": Tmt050Name,
        "Tmt170Delimthd": tmt170_delimthd,
        "Tmt171Paymethd": tmt171_paymethd,

        // product
        "Product": productModel,
        "ProductCategory": prodcutcategoryModel,
        "ProductVariation": productvariationModel,
        "ProductColor": productcolorModel,
        "ProductSize": productsizeModel,

        //tcc
        "TCC030SEQNO":tcc030_seqno,


        //tot
        "Tot010Sts": tot010_stsModel,
        "Tot020Ordhed": tot020_ordhedModel,
        "Tot040Orddtl": tot040_orddtlModel,

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
    // system
    this.defineModel('sys_menu', MenuModel);
    this.defineModel('sys_user', UserModel);
    this.defineModel('sys_role', RoleModel);
    this.defineModel('sys_department', DepartmentModel);
    // master
    this.defineModel('TMT341FILE', TMT341FILEModel);
    this.defineModel('TMT340FORMITEMNM', TMT340FORMITEMNMModel);
    this.defineModel('Tmt120Branch', tmt120_branchModel);
    this.defineModel('Tmt050Name', Tmt050Name);
    this.defineModel('Tmt170Delimthd', tmt170_delimthd);
    this.defineModel('Tmt171Paymethd', tmt171_paymethd);
    

    // product
    this.defineModel('Product', productModel);
    this.defineModel('ProductCategory', prodcutcategoryModel);
    this.defineModel('ProductVariation', productvariationModel);
    this.defineModel('ProductSize', productsizeModel);
    this.defineModel('ProductColor', productcolorModel);
    // 

    // tcc
    this.defineModel('TCC030SEQNO', tcc030_seqno);

    // tot
    this.defineModel('Tot010Sts', tot010_stsModel);
    this.defineModel('Tot020Ordhed', tot020_ordhedModel);
    this.defineModel('Tot040Orddtl', tot040_orddtlModel);


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

    //relationship product
    // quan hệ 1 nhiều giưa product : productCategory
    this.models.ProductCategory.hasMany(this.models.Product,  {foreignKey: 'category_id'});
    this.models.Product.belongsTo(this.models.ProductCategory);

    // quan hệ 1 sản phẩm có nhiều biến thế. 
    this.models.Product.hasMany(this.models.ProductVariation, {foreignKey: 'product_id'});
    this.models.ProductVariation.belongsTo(this.models.Product);

    // quan hệ nhiều nhiều giữa biết thể và màu sắc.
    this.models.ProductVariation.belongsToMany(this.models.ProductColor, {through: "variation_color"});
    this.models.ProductColor.belongsToMany(this.models.ProductVariation,  {through: "variation_color"});

    // quan hệ nhiều nhiều giữa biết thể và size.
    this.models.ProductVariation.belongsToMany(this.models.ProductSize, {through: "variation_size"});
    this.models.ProductSize.belongsToMany(this.models.ProductVariation,  {through: "variation_size"});


    // 1 trang thái đơn hàng có 1 đơn hàng
    this.models.Tot010Sts.hasOne(this.models.Tot020Ordhed, {foreignKey: 'SOODNO'});
    this.models.Tot020Ordhed.belongsTo(this.models.Tot010Sts);

    // 1 đơn hàng có 1 phương thức vận chuyển, 1 ptvc có ở nhiều đơn hàng
    this.models.Tmt170Delimthd.hasMany(this.models.Tot020Ordhed, {foreignKey: "DELIMTHDCD"});
    this.models.Tot020Ordhed.belongsTo(this.models.Tmt170Delimthd);
    
    // 1 đơn hàng có 1 phương thức thanh toán, 1 pttt có ở nhiều đơn hang
    this.models.Tmt171Paymethd.hasMany(this.models.Tot020Ordhed, { foreignKey: "PAYMETHDCD"});
    this.models.Tot020Ordhed.belongsTo(this.models.Tmt171Paymethd);

    // 1 nhân viên ơ nhiều đơn hàng, 1 đơn hàng có 1 nhân viên
    this.models.sys_user.hasMany(this.models.Tot020Ordhed, {foreignKey: 'USERCD'});
    this.models.Tot020Ordhed.belongsTo(this.models.sys_user);

    // 1 khách khàng ở nhiều đơn hàng, 1 đơn hàng có 1 khách hàng
    this.models.sys_user.hasMany(this.models.Tot020Ordhed, {foreignKey: 'CSTMCD'});

    // 1 đơn hàng có nhiều chi tiết, 
    this.models.Tot020Ordhed.hasMany(this.models.Tot040Orddtl, {foreignKey: "SOODNO"});
    this.models.Tot040Orddtl.belongsTo(this.models.Tot020Ordhed);

    // 1 sản phẩm ở một chi tiết.
    this.models.Product.hasOne(this.models.Tot040Orddtl, {foreignKey: 'PRODUCTCD'});
    this.models.Tot040Orddtl.belongsTo(this.models.Product);

  }

  async sync() {
    // Đồng bộ hóa cơ sở dữ liệu với các mô hình đã định nghĩa
    await this.sequelize.sync();
    console.log('Đã đồng bộ hóa cơ sở dữ liệu');
  }
}

module.exports = Database;
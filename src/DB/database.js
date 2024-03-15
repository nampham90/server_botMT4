const { Sequelize } = require('sequelize');
const Logger = require('../common/logFile');
const dotenv = require('dotenv');
const dbconfig = require('./dbproviders');
const model = require('./dbmodel');
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
const tst010_stckModel = require('./model/tst/tst010_stck.model');
const tmt130_lctnModel = require('./model/master/tmt130_lctn.model');
const tmt140_qualityModel = require('./model/master/tmt140_quality.model');
const tin010_stsModel = require('./model/in/tin010_sts.model');
const tin020_planhedModel = require('./model/in/tin020_planhed.model');
const tin040_plandtlModel = require('./model/in/tin040_plandtl.model');
const tmt150_supplyModel = require('./model/master/tmt150_supply.model');
const tmt280_divModel = require('./model/master/tmt280_div.model');
const tmt010_companyModel = require('./model/master/tmt010_company.model');


class Database {
  constructor() {

    const dbConfig = dbconfig();
    this.sequelize = new Sequelize(dbConfig);
    
    this.models = model // Chứa các mô hình (models) của cơ sở dữ liệu
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
    this.defineModel('Tmt010Company', tmt010_companyModel);
    this.defineModel('TMT341FILE', TMT341FILEModel);
    this.defineModel('TMT340FORMITEMNM', TMT340FORMITEMNMModel);
    this.defineModel('Tmt120Branch', tmt120_branchModel);
    this.defineModel('Tmt050Name', Tmt050Name);
    this.defineModel('Tmt170Delimthd', tmt170_delimthd);
    this.defineModel('Tmt171Paymethd', tmt171_paymethd);
    this.defineModel('Tmt130Lctn', tmt130_lctnModel);
    this.defineModel('Tmt140Quality', tmt140_qualityModel);
    this.defineModel('Tmt280Div', tmt280_divModel);
    // this.defineModel('Tmt150Supply', tmt150_supplyModel);
    

    // product
    this.defineModel('Product', productModel);
    this.defineModel('ProductCategory', prodcutcategoryModel);
    this.defineModel('ProductVariation', productvariationModel);
    this.defineModel('ProductSize', productsizeModel);
    this.defineModel('ProductColor', productcolorModel);

    // 

    // tcc
    this.defineModel('TCC030SEQNO', tcc030_seqno);

    // tin
    this.defineModel('Tin010Sts', tin010_stsModel);
    this.defineModel('Tin020Planhed' , tin020_planhedModel);
    this.defineModel('Tin040Plandtl', tin040_plandtlModel);

    // tot
    this.defineModel('Tot010Sts', tot010_stsModel);
    this.defineModel('Tot020Ordhed', tot020_ordhedModel);
    this.defineModel('Tot040Orddtl', tot040_orddtlModel);

    // tst
    this.defineModel('Tst010Stck', tst010_stckModel);


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

    // 1 công ty có nhiều user, 1 user chi co 1 công ty
    this.models.Tmt010Company.hasMany(this.models.sys_user, {foreignKey: 'CMPNYCD'});
    this.models.sys_user.belongsTo(this.models.Tmt010Company);

    // 1 công ty có nhiều kho hàng, 1 kho hàng chỉ có 1 công ty
    this.models.Tmt010Company.hasMany(this.models.Tmt120Branch, {foreignKey: "CMPNYCD"});
    this.models.Tmt120Branch.belongsTo(this.models.Tmt010Company);

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

    // 1 trang thai đơn hàng nhập có 1 đơn hàng hang nhâp: 1:1
    this.models.Tin010Sts.hasOne(this.models.Tin020Planhed, {foreignKey: 'SIPLNNO'});
    this.models.Tin020Planhed.belongsTo(this.models.Tin010Sts);

    // 1 nhà cung cấp ơ nhiều đơn hàng nhap, 1 đơn hàng có 1 nhà cungc câp
    this.models.sys_user.hasMany(this.models.Tin020Planhed, {foreignKey: 'SPPLYCD', as: 'supplier'});
    this.models.Tin020Planhed.belongsTo(this.models.sys_user, {foreignKey: 'SPPLYCD', as: 'supplier'});

    // 1 nhân viên ơ nhiều đơn hàng nhập, 1 đơn hàng nhập có 1 nhân viên
    this.models.sys_user.hasMany(this.models.Tin020Planhed, {foreignKey: 'USERCD', as: 'employe'});
    this.models.Tin020Planhed.belongsTo(this.models.sys_user, {foreignKey: 'USERCD', as: 'employe'});

    // 1 đơn hang nhập có nhiều chi tiết, 
    this.models.Tin020Planhed.hasMany(this.models.Tin040Plandtl, {foreignKey: "SIPLNNO"});
    this.models.Tin040Plandtl.belongsTo(this.models.Tin020Planhed);

    // 1 đơn đơn hàng nhập có 1 Phương thức thanh toán, 1 phương thương thức thanh toán có ở nhiều đơn hàng nhập
    this.models.Tmt280Div.hasMany(this.models.Tin020Planhed, {foreignKey: "DIVKBN"});
    this.models.Tin020Planhed.belongsTo(this.models.Tmt280Div);

    // 1 sản phẩm ở nhiều chi tiết. 1 chi tiết có 1 sản phẩm
    this.models.Product.hasMany(this.models.Tin040Plandtl, {foreignKey: 'PRODUCTCD'});
    this.models.Tin040Plandtl.belongsTo(this.models.Product);

    // 1 chất lượng sản phẩm có ở nhiều chi tiết, 1 chi tiết có 1 chât lượng
    this.models.Tmt140Quality.hasMany(this.models.Tin040Plandtl, {foreignKey: "QTYCD"});
    this.models.Tin040Plandtl.belongsTo(this.models.Tmt140Quality)

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
    this.models.sys_user.hasMany(this.models.Tot020Ordhed, {foreignKey: 'USERCD', as: 'employee'});
    this.models.Tot020Ordhed.belongsTo(this.models.sys_user, {foreignKey: 'USERCD', as: 'employee'});

    // 1 khách khàng ở nhiều đơn hàng, 1 đơn hàng có 1 khách hàng
    this.models.sys_user.hasMany(this.models.Tot020Ordhed, {foreignKey: 'CSTMCD', as: 'customer'});
    this.models.Tot020Ordhed.belongsTo(this.models.sys_user, {foreignKey: 'CSTMCD', as: 'customer'});

    // 1 đơn hàng có nhiều chi tiết, 
    this.models.Tot020Ordhed.hasMany(this.models.Tot040Orddtl, {foreignKey: "SOODNO"});
    this.models.Tot040Orddtl.belongsTo(this.models.Tot020Ordhed);

    // 1 sản phẩm ở nhiều chi tiết xuất. 1 chi tiết chỉ có 1 sản phẩm
    this.models.Product.hasMany(this.models.Tot040Orddtl, {foreignKey: 'PRODUCTCD'});
    this.models.Tot040Orddtl.belongsTo(this.models.Product);

    // 1 kho có nhiều sản phẩm (PRODUCTCD)
    this.models.Product.hasMany(this.models.Tst010Stck, {foreignKey: "PRODUCTCD"});
    this.models.Tst010Stck.belongsTo(this.models.Product);

    // 1 khó có nhiều nhánh (BRNCHCD)
    this.models.Tmt120Branch.hasMany(this.models.Tst010Stck, {foreignKey: "BRNCHCD"});
    this.models.Tst010Stck.belongsTo(this.models.Tmt120Branch);

    // 1 kho có nhiều nhà cung cấp (SUPPLYCD). 1 nhà cung cấp ở nhiều kho
    this.models.sys_user.hasMany(this.models.Tst010Stck, {foreignKey: "SUPPLYCD"});
    this.models.Tst010Stck.belongsTo(this.models.sys_user);
    // 1 kho có nhiều hãng sản xuất (MANUFACTTURECD)
    this.models.sys_user.hasMany(this.models.Tst010Stck, {foreignKey: "MANUFACTTURECD"});
    // 1 kho có nhiều nhân viên nhập hàng (EMPLOYEECD )
    this.models.sys_user.hasMany(this.models.Tst010Stck, {foreignKey: "EMPLOYEECD"});
    // 1 kho có nhiều vị trí lưu trử hàng hóa
    this.models.Tmt130Lctn.hasMany(this.models.Tst010Stck, {foreignKey: "LCTNCD"});
    this.models.Tst010Stck.belongsTo(this.models.Tmt130Lctn);

    // 1 branch cd có nhiều vị trí
    this.models.Tmt120Branch.hasMany(this.models.Tmt130Lctn, {foreignKey: "BRNCHCD"});
    this.models.Tmt130Lctn.belongsTo(this.models.Tmt120Branch);

    // 
    this.models.Tmt140Quality.hasMany(this.models.Tst010Stck, {foreignKey: "QTYCD"});
    this.models.Tst010Stck.belongsTo(this.models.Tmt140Quality);

    //
    this.models.Tmt140Quality.hasMany(this.models.Tot040Orddtl, {foreignKey: "QTYCD"});
    this.models.Tot040Orddtl.belongsTo(this.models.Tmt140Quality)

    // 

  }

  async sync() {
    // Đồng bộ hóa cơ sở dữ liệu với các mô hình đã định nghĩa
    await this.sequelize.sync();
    console.log('Đã đồng bộ hóa cơ sở dữ liệu');
  }
}

module.exports = Database;

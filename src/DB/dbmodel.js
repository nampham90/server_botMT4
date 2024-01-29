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

const model = {
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
     "Tmt130Lctn": tmt130_lctnModel,
     "Tmt140Quality": tmt140_qualityModel,

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

     // tst // trong kho
     "Tst010Stck": tst010_stckModel,
};

module.exports = model;

// user
module.exports.UserLogin = '/login';
module.exports.UserGetMenu = '/menu';
module.exports.UserFindById = '/ant100GetDetailUser';
module.exports.UserFindByDepartmentId = '/ant100userfindbydepartmentid';
module.exports.UserUpdate = '/ant100EditDetailUser';
module.exports.UserCreate = '/ant100AddDetailUser';
module.exports.UserCheckEmail = '/ant100CheckEmailUser';
module.exports.UserCheckName = '/ant100CheckNameUser';
module.exports.UserChangePassword = '/ant100ChangePasswordUser';
module.exports.UserFindAll = '/ant100SearchAllUser';
module.exports.UserDelete = '/ant100DeleteUsers';

// menu 
module.exports.MenuCreate = '/ant100AddMenu';
module.exports.MenuUpdate = '/ant100EditMenu';
module.exports.MenuDelete = '/ant100DelMenu';
module.exports.MenuFindByID = '/ant100PostDetailMenu';
module.exports.MenuFindAll = '/ant100ListMenu';
module.exports.MenuFindAllParams = '/ant100ListMenuParams';//ant100ListMenuParams
module.exports.MenuFindAllURl = '/ant100PostUrlParams';

// role 
module.exports.RoleCreate = '/ant100AddDetailRole';
module.exports.RoleUpdate = '/ant100EditDetailRole';
module.exports.RoleDelete = '/ant100DelDetailRole';
module.exports.RoleFindById = '/ant100GetDetailRole';
module.exports.RoleFindAll = '/ant100SearchAllRole';//
module.exports.RoleSearchAll = '/ant100GetSearchAllRole';// không có phân trang
module.exports.RoleGetMenu = '/ant100GetpermissionRole/:id';//
module.exports.RolePutMenu = '/ant100PutpermissionRole';//

// datasc
module.exports.DatascFindById = '/ant100DetailDatasc';
module.exports.DatascFindAll = '/ant100SearchAllDatasc';//
module.exports.DatascCreate = '/ant100AddListDatasc';
module.exports.DatascUpdate = '/ant100EditDatasc';
module.exports.DatascDelete = '/ant100DelDatasc';



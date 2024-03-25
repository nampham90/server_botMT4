
// const sysuserRoutes = require('@nanp/system/sysuser/sysuser.routes');
// const sysdepartmentRoutes = require('@nanp/system/sysdepartment/sysdepartment.routes');
// const SysPermissionRoutes = require('@nanp/system/syspermisstion/syspermisstion.routes');
// const sysroleRoutes = require('@nanp/system/sysrole/sysrole.routes');
// const sysdatascRoutes = require('@nanp/system/sysdatasc/sysdatasc.routes');
// const spmt00900Routes = require('@nanp/master/spmt00900/spmt00900.routes');
const sysdepartmentRoutes = require('../NANP/system/sysdepartment/sysdep.routes');
const sysuserRoutes = require('../NANP/system/sysuser/sysuser.routes');
const sysroleRoutes = require('../NANP/system/sysrole/sysrole.routes');
const sysmenuRoutes = require('../NANP/system/sysmenu/sysmenu.routes');
const sysdatascRoutes = require('../NANP/system/sysdatasc/sysdatasc.routes');
const tmt001Routes = require('../NANP/master/tmt001_syslog/tmt001.routes');
const tmt002Routes = require('../NANP/master/tmt002_video/tmt002.routes');
const tmt003Routes = require('../NANP/master/tmt003_file/tmt003.routes');

const apiRouter = require('../NANP/master/api/api.routes');
const spot00101Routes = require('../NANP/out/spot00101/spot00101.routes');
const tmt050Routes = require('../NANP/master/tmt050_name/tmt050.routes');
const stockRoutes = require('../NANP/stock/stock.routes');
const productRoutes = require('../NANP/product/product.routes');
const tmt140Routes = require('../NANP/master/tmt140_qualiti/tmt140.routes');
const tmt170Routes = require('../NANP/master/tmt170_delimthd/tmt170.routes');
const tmt171Routes = require('../NANP/master/tmt171_paymethd/tmt171.routes');
const reportRoutes = require('../NANP/report/report.routes');
const spmt00101Routes = require('../NANP/product/spmt00101/spmt00101.routes');
const tmt280Routes = require('../NANP/master/tmt280_div/tmt280.routes');
const spin00101Routes = require('../NANP/in/spin00101/spin00101.routes');
const spin00201Routes = require('../NANP/in/spin00201/spin00201.routes');
class Routes {
    constructor(app) {

        // route Sys Department
        app.use("/api/phongban", sysdepartmentRoutes);

        // route sysuser
        app.use("/api/user", sysuserRoutes);

        // route sysrole
        app.use("/api/role", sysroleRoutes);

        // route syspermission
        app.use("/api/menu", sysmenuRoutes);

        // route Sys DataSc
        app.use("/api/screenpc", sysdatascRoutes);

        // route tmt001_syslog
        app.use('/api/nhatkyhethong', tmt001Routes);

        // tmt
        app.use('/api/tmt101', tmt002Routes);
        app.use('/api/tmt010', tmt003Routes);
        app.use('/api/tmt050', tmt050Routes);
        app.use('/api/tmt140', tmt140Routes);
        app.use('/api/tmt170', tmt170Routes);
        app.use('/api/tmt171', tmt171Routes);
        app.use('/api/tmt280', tmt280Routes);
        

        // Api
        app.use('/api/master', apiRouter);

        // xuat hang
        app.use('/api/spin00101', spin00101Routes);
        app.use('/api/spin00201', spin00201Routes);
        // app.use('/api/spin00501', )

        // xuat hang 
        app.use('/api/spot00101', spot00101Routes);

        // stock (trong kho)
        app.use('/api/stock', stockRoutes);

        // product (sản phẩm)
        app.use('/api/product', productRoutes);

        // quản lý sản phẩm
        app.use('/api/spmt00101', spmt00101Routes);

        // report
        app.use('/api/report', reportRoutes);

    }
}

module.exports = Routes;
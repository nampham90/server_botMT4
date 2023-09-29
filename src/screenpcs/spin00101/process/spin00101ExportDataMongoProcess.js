const AbstractProcess = require('../../../process/abstractProcess/AbstractProcess');

class ExportDataMongo extends AbstractProcess {
    constructor(dbCon) {
        super(dbCon)
    }

    async export(data, session) {
        return this.execute(this.database, data, session);
    }

    async process(db, data, session) {
        const User = db.models.user;
        const Menu = db.models.menu;
        const Role = db.models.role;
        const Phongban = db.models.phongban;
        let res = {
            listUser : [],
            listMenu : [],
            listRole : [],
            listDepartment: []
        }

        res.listUser = await User.find({});
        res.listMenu = await Menu.find({});
        res.listRole = await Role.find({});
        res.listDepartment = await Phongban.find({});

        return res;
    }
}

module.exports = ExportDataMongo
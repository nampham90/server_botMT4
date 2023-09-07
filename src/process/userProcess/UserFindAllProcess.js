const AbstractProcess = require('../abstractProcess/AbstractProcess');
const db = require("../../model");
let commonfun = require('../../common/functionCommon');

class UserFindAllProcess extends AbstractProcess {
    constructor(dbcon) {
        super(dbcon);
    }

    async findAll(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db,data,session) {
        let User = db.models.user;
        let allData = await User.find(data.filters); 
        if(data.pageNum == 0 && data.pageSize ==0) {
            return allData
        } else {
            let n = data.pageNum - 1;
            let lst = await User.find(data.filters).limit(data.pageSize).skip(data.pageSize*n);
            let res = commonfun.dataReponse(allData,lst,data.pageNum,data.pageSize);
            return res;
        }
    }

}

module.exports = UserFindAllProcess;


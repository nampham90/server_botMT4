const Transaction = require('../abstractProcess/Transaction');
const db = require("../../model");
let commonfun = require('../../common/functionCommon');

class UserFindAllProcess extends Transaction {
    constructor(dbcon) {
        super(dbcon);
    }

    async findAll(data,session) {
        return this.execute(db,data,session);
    }

    async process(db,data,session) {
        let User = db.user;
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


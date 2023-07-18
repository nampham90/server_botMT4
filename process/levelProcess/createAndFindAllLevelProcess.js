const AbstractProcess = require('../abstractProcess/AbstractProcess');

class CreateAndFindAllLevelPorcess extends AbstractProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    createAndFindAll(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db, data, session) {
        const Level = db.models.level;
        let lstLevel = await Level.find({});
        if(lstLevel.length == 0) {
            // tạo list level
            await this.createListLevel(db,session);
            lstLevel = await Level.find({});
        }
        return lstLevel;
    }

    async createListLevel(db,session) {
        const Level = db.models.level;
        for(let i = 1; i<=5; i ++) {
            let ssr1 = "";// quy định số phần , 3,4
            let ssr2 = ""; // quy định số câu hỏi trong phần thi số 1
            let ssr3 = ""; // quy định số câu hỏi trong phần thi số 2
            let ssr4 = ""; // quy định số câu hỏi trong phần thi số 3
            let ssr5 = ""; // quy định số câu hỏi trong phần thi số 4
            switch(i) {
                case 1 : 
                    ssr1 = "3";
                    ssr2 = "35";
                    ssr3 = "36";
                    ssr4 = "8";
                    ssr5 = "0";
                    break;
                case 2 : 
                    ssr1 = "3";
                    ssr2 = "35";
                    ssr3 = "36";
                    ssr4 = "8";
                    ssr5 = "0";
                    break;
                case 3 : 
                    ssr1 = "3";
                    ssr2 = "35";
                    ssr3 = "36";
                    ssr4 = "8";
                    ssr5 = "0";
                    break;
                case 4 : 
                    ssr1 = "3";
                    ssr2 = "35";
                    ssr3 = "36";
                    ssr4 = "8";
                    ssr5 = "0";
                    break;
                case 5 : 
                    ssr1 = "3";
                    ssr2 = "35";
                    ssr3 = "36";
                    ssr4 = "8";
                    ssr5 = "0";
                    break;
            }
            let newLevel = Level({
                name: "N" + i,
                quizzes: [],
                strrsrv1: ssr1,
                strrsrv2: ssr2,
                strrsrv3: ssr3,
                strrsrv4: ssr4,
                strrsrv5: ssr5
            })
            await Level.collection.insertOne(newLevel, { session });
        }
    }
}

module.exports = CreateAndFindAllLevelPorcess;
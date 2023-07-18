const AbstractProcess = require('../abstractProcess/AbstractProcess');
const { ObjectId } = require('mongodb');

class CreateQuizzesProcess extends AbstractProcess {
    constructor(dbcon) {
        super(dbcon)
    }

    createQuizzes(data,session) {
        return this.execute(this.database,data,session);
    }

    async process(db, data, session) {
        const Level = db.models.level;
        const Quiz = db.models.quiz;
        const Section = db.models.section;
        const Question = db.models.question;

        let title = data.title;
        let idLevel = data.idLevel;

        // tạo đề thi vơi param. (tên đề thì, idLevel, lượng phần thi, số câu hỏi trong phần thi)
        // số lượng phần thì tự quy định theo trình độ;
        // số lượng câu của từng phần được quy định săn theo từng level và từng phần
    }
}

module.exports = CreateQuizzesProcess;
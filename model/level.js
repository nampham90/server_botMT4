// table lưu danh sách level 
module.exports = mongoose => {
    const dbcon = require("../common/DBConnect");
      let schema = mongoose.Schema(
        {
          name: String, // Tên trình độ, ví dụ: "N1", "N2", "N3", "N4", "N5".
          quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'quiz' }], //Mảng chứa các đề thi thuộc trình độ.
          strrsrv1: String, // quy định số phần
          strrsrv2: String, // quy định số câu hỏi trong phần 1
          strrsrv3: String, // quy định số câu hỏi trong phần 2
          strrsrv4: String, // quy định số câu hỏi trong phần 3
          strrsrv5: String  // quy định số câu hỏi trong phần 4
        },
        { timestamps: true }
      );
      schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
      const level = dbcon.dbDemo.model("level", schema);
      return level;
};
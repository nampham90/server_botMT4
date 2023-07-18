// table lưu danh sách question 
module.exports = mongoose => {
    const dbcon = require("../common/DBConnect");
      let schema = mongoose.Schema(
        {
          content: String, // nội dung câu hỏi
          options: [String],// mãng chứa các đáp án
          correctOption: Number, // đáp án đúng
          score: Number, // điểm số
          strrsrv1: String, 
          strrsrv2: String, 
          strrsrv3: String, 
          strrsrv4: String,
          strrsrv5: String
        },
        { timestamps: true }
      );
      schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
      const question = dbcon.dbDemo.model("question", schema);
      return question;
};
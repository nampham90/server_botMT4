// table lưu danh sách level 
module.exports = mongoose => {
    const dbcon = require("../common/DBConnect");
      let schema = mongoose.Schema(
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, //Mã người dùng liên kết với kết quả.
            quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'quiz' }, //Mã đề thi liên kết với kết quả.
            answers: [Number], // Mảng chứa các câu trả lời của người dùng.
            score: Number, // Điểm số đạt được.
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
    
      const result = dbcon.dbDemo.model("result", schema);
      return result;
};
// table lưu danh sách quiz 
module.exports = mongoose => {
    const dbcon = require("../common/DBConnect");
      let schema = mongoose.Schema(
        {
          title: String, // Tiêu đề hoặc tên của đề thi.
          sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'section' }], //Mảng chứa các phần thi thuộc đề thi.
          duration: Number, // thời gian thi
          levelId: { type: mongoose.Schema.Types.ObjectId, ref: 'level' }, // Thêm trường levelId để liên kết với trình độ
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
    
      const quiz = dbcon.dbDemo.model("quiz", schema);
      return quiz;
};
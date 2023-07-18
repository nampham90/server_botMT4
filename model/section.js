// table lưu danh sách phần thi
module.exports = mongoose => {
    const dbcon = require("../common/DBConnect");
      let schema = mongoose.Schema(
        {
            name: String, // tên phân thi
            questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'question' }],// Mảng chứa các câu hỏi thuộc phần thi.
            strrsrv1: String, // link bài nge
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
    
      const section = dbcon.dbDemo.model("section", schema);
      return section;
};
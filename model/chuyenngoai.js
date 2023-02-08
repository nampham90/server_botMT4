
module.exports = mongoose => {
  const dbcon = require("../common/DBConnect");
    let schema = mongoose.Schema(
      {
        ngaydi: Date,
        ngayve:Date,
        nguonxe: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:"nguonxe"
          }],
        biensoxe: String, // biển số xe ngoài
        tentaixe: String, // tài xế
        sodienthoai: String,// điện thoại tài xế
        changduong: String, // điểm khởi hành và điểm kết thúc
        status01: Number, // 0. chuyến đang hoat động. 1. chuyến đã kết thúc
        status02: Number, 
        status03: Number, 
        status04: Number,
        status05: Number,
        ghichu: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const chuyenngoai = dbcon.dbDemo.model("chuyenngoai", schema);
    return chuyenngoai;
};

module.exports = mongoose => {
  const dbcon = require("../common/DBConnect");
    let schema = mongoose.Schema(
      {
        ngaynhap: Date,
        ngayvanchuyen: Date,  // ngày vận chuyển
        ngaydukiengiaohang: Date,// ngày dự kiến giao hàng
        nguonxe: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"nguonxe"
          },
        soods: {type:String,default: ""},
        biensoxe: String, // biển số xe ngoài
        sdtnguonxe: String, // so dien thoai nguon xe
        tentaixe: String, // tài xế
        sodienthoai: String,// điện thoại tài xế
        listdetail: [{
          type: mongoose.Schema.Types.ObjectId,
          ref:"chitietchuyenngoai"
        }],
        status01: Number, // 0. chuyến đang hoat động. 1. chuyến đã kết thúc
        status02: Number, // 0 cho phep cập nhật chuyến. 1 không cho phep cập nhật chuyến
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
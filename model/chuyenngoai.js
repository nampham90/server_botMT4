
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
        soodn: String,
        hinhthucthanhtoan:String, // "0". Trực tiếp. "1" ghi nợ
        biensoxe: String, // biển số xe ngoài
        sdtnguonxe: String, // so dien thoai nguon xe
        tentaixe: String, // tài xế
        sodienthoai: String,// điện thoại tài xế
        listID: [{
          type: mongoose.Schema.Types.ObjectId,
          ref:"phieunhaphang"
        }],
        soHDTTXHCN: String, // số hóa đơn thực tế xuất hàng chuyến ngoài
        status01: Number, // 0. dự dịnh. 1. xuất phiếu thực tế chuyến hàng xe ngoài,
        status02: Number, // 0 cho phep cập nhật chuyến. 1 không cho phep cập nhật chuyến
        status03: Number, // hinh thuc thanh toan.  0 trưc tiếp . 1 ghi nợ
        status04: Number,
        status05: Number,
        strrsrv1: String,
        strrsrv2: String,
        strrsrv3: String,
        strrsrv4: String,
        strrsrv5: String,
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
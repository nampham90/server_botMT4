
module.exports = mongoose => {
  const dbcon = require("../common/DBConnect");
    let schema = mongoose.Schema(
      {
        iduser: {
          type: mongoose.Schema.Types.ObjectId,
          ref:"user"
        }, // mã khách hàng
        trangthai: Number, // 0 nợ, 1 trả, 2 duyệt trả
        sotien: Number, // số tiền nợ hoặc trả
        idchuyen: {  // nếu nợ có id chuyến. nếu trả id = null
          type: mongoose.Schema.Types.ObjectId,
          ref:"chuyen"
        },
        idphieunhaphang: {  // id phiếu nhập hàng => để biết thông tin đơn hàng đó
          type: mongoose.Schema.Types.ObjectId,
          ref:"phieunhaphang"
        },
        hinhthucthanhtoan: Number, // hinh thức thánh toán . nếu là nợ thì hình thức thanh toán = null
        ngay: Date, // ngày trả hoặc nay nợ . tự động lấy ngày giờ hiện tại
        ghichu: String, // ghi chu cần thiết. để đối chiếu với khách hàng
        chukyno: Number, // 0 chu kỳ mới, 1 đã tất toán . trả ghì có trường này. khi tất toan update chu ky nợ = 1 . gi chú tất toán
        status01: String,
        status02: String,
        status03: String,
        status04: String,
        status05: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const nhatkykh= dbcon.dbDemo.model("nhatkykh", schema);
    return nhatkykh;
};
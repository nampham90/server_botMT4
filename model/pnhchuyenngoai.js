
module.exports = mongoose => {
  const dbcon = require("../common/DBConnect");
    let schema = mongoose.Schema(
      {
         idchuyenngoai: {
          type: mongoose.Schema.Types.ObjectId,
          ref:"chuyenngoai"
         }, // mã chyến hàng
         biensoxe: String, // biến số xe ngoài
         iduser: {
          type: mongoose.Schema.Types.ObjectId,
          ref:"user"
         },// mã khách hàng
         tiencuocnhan:Number,// cược nhận từ khách hàng
         ngaynhap: Date,
         noidungdonhang:String, // nôi dung đơn hàng. vd: gửi gạch đi phú quốc
         diadiembochang:String,  // Địa chỉ bọc hàng
         thongtintrahang: String, // nôi dung ngươi nhận hàng(địa thoại, địa chỉ)
         htttkhachhang:Number, // 1  trực tiếp. 2. ghi nợ . 3 thanh toan khi nhận hàng
         tiencuoctra: Number, // cước trả cho xe ngoài
         htttxengoai: Number, // 1. trực tiêp. 2. ghi nợ
         ghichu: String, // ghi chú đơn hàng
         status01: Number, // 0. khach hàng chưa thanh toán. 1 khách hàng đã thanh toan
         status02: Number, // 0. ghi nợ xe ngoài. 1 đã thanh toán xe ngoài
         status03: Number,
         status04: Number,
         status05: Number,
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const pnhchuyenngoai = dbcon.dbDemo.model("pnhchuyenngoai", schema);
    return pnhchuyenngoai;
};
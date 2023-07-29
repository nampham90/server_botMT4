
module.exports = mongoose => {
  const dbcon = require("../../common/DBConnect");
    let schema = mongoose.Schema(
      {
         soID: String, // tra cứu đơn hàng
         soODT: String,// tra cứu chuyến trong nhà
         soODN: String,// tra cưu chuyến ngoài.
         idchuyen: {
          type: mongoose.Schema.Types.ObjectId,
          ref:"chuyen" // khi nhập hàng null / khi add vào chuyến mơi có id chuyến hàng
         }, // mã chyến hàng
         idchuyenngoai: {
          type: mongoose.Schema.Types.ObjectId,
          ref:"chuyenngoai" // khi nhập hàng null / khi add vào chuyến mơi có id chuyến hàng
         }, // mã chuyến hàng
         biensoxe: String, // biến số xe // khi nhập hàng null/ khi add vào chuyên thì có biên số xe
         iduser: {
          type: mongoose.Schema.Types.ObjectId,
          ref:"user"
         },// mã khách hàng
         cpdvtncd:{
          type: mongoose.Schema.Types.ObjectId,
          ref:"chiphidutrudonhang"
         },
         tiencuoc:Number,// tiền cươc xe của 1 loại hàng
         lotrinh: String, // lộ trình vận chuyển đi hay lộ trình hàng về
         tenhang:String, // nôi dung đơn hàng. vd: gửi gạch đi phú quốc
         soluong: Number, //vd: 1 kiện, 2 tân, 3 kg
         soluongthucte: Number, // so lượng thực tế nhập
         trongluong: Number, //vd : 0.23, 1.4;
         khoiluong: Number, //vd : 0.4, 0.23
         donvitinh: String, //vd: kiện , tấn , kg, khối
         diadiembochang:String,  // Địa chỉ bọc hàng . khi nhập . mặc định là bãi xe. trong kho 
         tennguoinhan: String,
         sdtnguoinhan: String,
         diachinguoinhan: String,
         ngaynhapdudinh: Date, // ngay dư dinh nhập hàng
         ngaynhapthucte: Date,// ngay thuc tế nhâp hàng
         ngayvanchuyen: Date, // ngày vận chuyển
         ngaytrahang: Date, // ngày trả hàng
         makho: String, //mã kho lưu hàng
         hinhthucthanhtoan:Number, // truc tiep => 1,  ghi nhợ=> 2, thanh toan khi nhan hang => 3 , đã thanh toan => 4
         ghichu: String, // ghi chú đơn hàng
         trangthai: Number, // 0 dự định nhập: 1 Thực tế nhập. 2, dư định xuất, 3 thực tế xuất , 4. đã giao hang
         chiphidenhang: Number, // sô tiền đền hàng. 
         lydodenhang: String, // cập nhật ly do đền hàng
         status01:Number, // null . 0 đã phát hành, 1 đã thanh toán/  trương công nợ
         status02:Number, // trường này lưu tiền cước xe ngoài
         status03:Number, // trường này lưu trạng thái thu hồi biên lai. 0 không thu hôi. 1 thu hôi, 2. đã thu hồi
         status04:Number,
         status05:Number,
         status06:Number,
         status07:Number,
         status08:Number,
         status09:Number,
         status10:Number,
         ngayphathanh: Date,//  ngày phat hành cong nơ
         ngaythanhtoan: Date,//  ngày thanh toan cong nơ
         strrsrv1: String, // lý do cập nhật tiền cước. 
         strrsrv2: String, // id nguồn xe ngoài
         strrsrv3: String, //
         strrsrv4: String,
         strrsrv5: String,
         strrsrv6: String,
         strrsrv7: String,
         strrsrv8: String,
         strrsrv9: String,
         strrsrv10: String,
         nguoiphathanh: {
          type: mongoose.Schema.Types.ObjectId,
          ref:"user"
         },// người phát hành
         soHDTTCN: String // tra cưu , chưng từ thanh toán công nơ
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const phieunhaphang = dbcon.dbDemo.model("phieunhaphang", schema);
    return phieunhaphang;
};
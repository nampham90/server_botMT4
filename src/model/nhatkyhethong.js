
module.exports = mongoose => {
  const dbcon = require("../common/DBConnect");
    let schema = mongoose.Schema(
      {
        loaithongbao: String, //Thông báo chung, thông báo hệ thống, thông báo về kế hoạch sắp tới notifi | system | vison
        noidung: String,
        iduser: {
          type: mongoose.Schema.Types.ObjectId,
          ref:"user"
        }, // ID User
        hanhdong: String, // updete || delete || create
        table: String, //tên table thay đổi
        ngay: Date, // thời gian thực hiện hàn động đó. _now
        status01: String, //"0" new. "1" xóa
        status02: String, // "0" chưa xác nhận , "1" đã xác nhận
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
  
    const nhatkykh= dbcon.dbDemo.model("nhatkyhethong", schema);
    return nhatkykh;
};
module.exports = mongoose => {
    const dbcon = require("../common/DBConnect");
      let schema = mongoose.Schema(
        {
          nguonxe: {
              type: mongoose.Schema.Types.ObjectId,
              ref:"nguonxe"
          },
          iddonhang: {
              type: mongoose.Schema.Types.ObjectId,
              ref:"chitietchuyenngoai"
          },
          soID: String,
          ngaynhap: Date,
          biensoxe: String, // biển số xe ngoài
          tentaixe: String, // tài xế xe ngoài
          sodienthoai: String,// điện thoại tài xế
          sotienno: Number, // số tiền mình nợ chủ xe thuê ngoài
          sohdttxn: String, // lưu só hóa đơn thánh toán xe ngoài.
          status01: Number, 
          status02: Number, // 0 chưa thanh toán // 1 chờ thanh toán // 2// đã thanh toán
          status03: Number, 
          status04: Number,
          status05: Number, 
          ghichu: String // NO, TRA
        },
        { timestamps: true }
      );
      schema.index({'sohdttxn':'text'});
      schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
      const congnoxengoai = dbcon.dbDemo.model("congnoxengoai", schema);
      return congnoxengoai;
  };
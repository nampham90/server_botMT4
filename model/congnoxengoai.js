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
          ngaynhap: Date,
          biensoxe: String, // biển số xe ngoài
          tentaixe: String, // tài xế xe ngoài
          sodienthoai: String,// điện thoại tài xế
          sotienno: Number, // số tiền mình nợ chủ xe thuê ngoài

          status01: Number, // 0. chưa thanh toán. 1. đã thanh toán
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
    
      const congnoxengoai = dbcon.dbDemo.model("congnoxengoai", schema);
      return congnoxengoai;
  };
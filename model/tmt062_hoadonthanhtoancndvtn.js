// day so thu hôi bien lai đã xuất
module.exports = mongoose => {
    const dbcon = require("../common/DBConnect");
      let schema = mongoose.Schema(
        {
          soHDTHCNDVTN: String,
          manhacungcap: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"tmt060_dichvuthuengoai"
          }, // mã nhà cung cập.
          sotien: Number, // tong số tiền 
          ngaylamviec: Date,
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
      const tmt062_hoadonthanhtoancndvtn = dbcon.dbDemo.model("tmt062_hoadonthanhtoancndvtn", schema);
      return tmt062_hoadonthanhtoancndvtn;
  };
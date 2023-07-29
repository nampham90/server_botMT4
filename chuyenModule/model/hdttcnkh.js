// day so thu hôi bien lai đã xuất
module.exports = mongoose => {
    const dbcon = require("../../common/DBConnect");
      let schema = mongoose.Schema(
        {
          idkhachhang: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"user"
          }, // 
          lstId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:"phieunhaphang"
          }],//
          tongcuoc: Number, //
          sohdttcnkh: String, // 3
          ngayxuat:Date,
          ngaythanhtoan:Date,
          status01: Number, 
          status02: Number, 
          status03: Number, 
          status04: Number,
          status05: Number,
          strrsrv1: String,
          strrsrv2: String,
          strrsrv3: String,
          strrsrv4: String,
          strrsrv5: String,
        },
        { timestamps: true }
      );
      schema.index({'sohdttcnkh': 'text'});
      schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
      const hdttcnkh = dbcon.dbDemo.model("hdttcnkh", schema);
      return hdttcnkh;
  };
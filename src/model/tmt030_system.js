// day so thu hôi bien lai đã xuất
module.exports = mongoose => {
    const dbcon = require("../common/DBConnect");
      let schema = mongoose.Schema(
        {
          cstmcd: String,
          SYSFLG1: Number, // 1. cho phép tài xế thay đổi trạng thai đơn hàng, 0 . không cho phép
          SYSFLG2: Number,//
          SYSFLG3: Number, //
          SYSFLG4: Number, // 
          SYSFLG5: Number, 
          SYSFLG6: Number, 
          SYSFLG7: Number, 
          SYSFLG8: Number,
          SYSFLG9: Number,
          SYSFLG10: Number,
        },
        { timestamps: true }
      );
    
      schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
      const tmt030 = dbcon.dbDemo.model("tmt030_system", schema);
      return tmt030;
  };
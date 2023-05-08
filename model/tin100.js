
module.exports = mongoose => {
    const dbcon = require("../common/DBConnect");
      let schema = mongoose.Schema(
        {
           soID: String,
           iduser: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"user"
           },// mã khách hàng
           ngaynhap: Date,
           hinhthucthanhtoan:Number, // truc tiep => 1,  ghi nhợ=> 2, thanh toan khi nhan hang => 3 
           ghichu: String, // ghi chú đơn hàng
           status01:Number,// 0 trong kho. 1 vận chuyển, 
           status02:Number, 
           status03:Number,
           status04:Number,
           status05:Number
        },
        { timestamps: true }
      );
    
      schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
      const tin100 = dbcon.dbDemo.model("tin100", schema);
      return tin100;
  };
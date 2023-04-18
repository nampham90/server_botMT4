// day so thu hôi bien lai đã xuất
module.exports = mongoose => {
    const dbcon = require("../common/DBConnect");
      let schema = mongoose.Schema(
        {
          idkhachhang: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"user"
          }, // 
          lstId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:"nhatkykh"
          }],//
          tongcuoc: Number, //
          soodc: String, // 3
          status01: Number, 
          status02: Number, 
          status03: Number, 
          status04: Number,
          status05: Number,
        },
        { timestamps: true }
      );
      schema.index({'soodc': 'text'});
      schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
      const donodc = dbcon.dbDemo.model("donodc", schema);
      return donodc;
  };
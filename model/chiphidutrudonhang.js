// day so thu hôi bien lai đã xuất
module.exports = mongoose => {
    const dbcon = require("../common/DBConnect");
      let schema = mongoose.Schema(
        {
          soID: String,
          tangbonhaphang: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"nguonxe"
          }, 
          sotiennhaphang: Number,
          htttnhaphang: Number,
          tentaixenhaphang: String,
          biensoxenhaphang: String,

          tangbotrahang: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"nguonxe"
          }, 
          sotientrahang: Number, // 
          httttrahang: Number,
          tentaixetrahang: String,
          biensoxetrahang: String,

          dichvuxecau: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"tmt060_dichvuthuengoai"
          }, // mã nhà cung cập. 
          sotienxecau: Number,
          htttxecau: Number,

          dichvuboxep: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"tmt060_dichvuthuengoai"
          }, // mã nhà cung cập. 
          sotienbocxep: Number,
          htttboxep: Number,

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
    
      const chiphidutrudonhang = dbcon.dbDemo.model("chiphidutrudonhang", schema);
      return chiphidutrudonhang;
  };
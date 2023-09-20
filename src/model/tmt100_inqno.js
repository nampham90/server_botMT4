// day so thu hôi bien lai đã xuất
module.exports = mongoose => {
    const dbcon = require("../common/DBConnect");
      let schema = mongoose.Schema(
        {
          cstmcd: String,
          maghep: {type:String, unique:true}, // Quy định 3 từ và duy nhất : ODS. maghep cho chuyến ngoài, ODT maghe cho chuyến trong 
          startnumber: String,//sô băt đầu 34000 -> 
          endnumber: String, //54999
          winnumber: String, // 34001
          status01: Number, 
          status02: Number, 
          status03: Number, 
          status04: Number,
          status05: Number,
          entdatetime: Date,
          entprg: String,
          updusrcd: String,
          upddatetime: Date,
          updprg:String,
        },
        { timestamps: true }
      );
    
      schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
      const tmt100 = dbcon.dbDemo.model("tmt100_inqno", schema);
      return tmt100;
  };
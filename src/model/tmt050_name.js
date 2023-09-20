// table tmt050_name
module.exports = mongoose => {
    const dbcon = require("../common/DBConnect");
      let schema = mongoose.Schema(
        {
          cstmcd: String,
          lang: String,
          rcdkbn: String, // tự quy dịnh vd: 00101 / list kho/
          datacd: String,//
          datanm: String, //
          datarnm: String, // 
          strrsrv1: String,
          strrsrv2: String,
          strrsrv3: String,
          strrsrv4: String,
          strrsrv5: String,
          status01: Number, 
          status02: Number, 
          status03: Number, 
          status04: Number,
          status05: Number,
          entusrcd: String,
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
    
      const tmt050 = dbcon.dbDemo.model("tmt050_name", schema);
      return tmt050;
  };
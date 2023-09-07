// table tmt050_name
module.exports = mongoose => {
    const dbcon = require("../common/DBConnect");
      let schema = mongoose.Schema(
        {
          rcdkbn: String, // tự quy dịnh vd: 00101 / list kho/
          datacd: String,//
          datanm: String, //
          datarnm: String, // 
          status01: Number, 
          status02: Number, 
          status03: Number, 
          status04: Number,
          status05: Number,
        },
        { timestamps: true }
      );
    
      schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
      const tmt050 = dbcon.dbDemo.model("tmt050", schema);
      return tmt050;
  };
// day so thu hôi bien lai đã xuất
module.exports = mongoose => {
    const dbcon = require("../common/DBConnect");
      let schema = mongoose.Schema(
        {
          userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"user"
          },
          opedatetime: String,
          filename: String,
          filetype: String,
          path: String, 
          sizefile: String, 
          strrsrv1: String, 
          strrsrv2: String, 
          strrsrv3: String, 
          strrsrv4: String,
          strrsrv5: String,
          strrsrv6: String,
          strrsrv7: String,
          strrsrv8: String,
          strrsrv9: String,
          strrsrv10: String,
        },
        { timestamps: true }
      );
    
      schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
      const tmt010_filecsv = dbcon.dbDemo.model("tmt010_filecsv", schema);
      return tmt010_filecsv;
  };
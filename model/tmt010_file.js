// day so thu hôi bien lai đã xuất
module.exports = mongoose => {
    const dbcon = require("../common/DBConnect");
      let schema = mongoose.Schema(
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"user"
          }, // user upload file
          filename: String, // tên file
          path: String, // đường dẫn file
          typefile: String, // loại file
          sizefile: String, // dung lượng file
          strrsrv1: String, // trường dự bị 1 
          strrsrv2: String,// trường dự bị 2 
          strrsrv3: String, // trường dự bị 3 
          strrsrv4: String, // trường dự bị 4 
          strrsrv5: String // trường dự bị 5
        },
        { timestamps: true }
      );
    
      schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
      const tmt010_file = dbcon.dbDemo.model("tmt010_file", schema);
      return tmt010_file;
  };
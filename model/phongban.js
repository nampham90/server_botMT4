module.exports = mongoose => {
    const dbcon = require("../common/DBConnect");
    let schema = mongoose.Schema(
      {
        tenphongban: {
            type: String,
            required: true,
            min: 3,
            max: 255
        },
        fatherId: Number | String,
        state: Boolean,
        orderNum: Number
      
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const phongban = dbcon.dbDemo.model("phongban", schema);
    return phongban;
};
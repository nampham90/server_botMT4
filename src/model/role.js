module.exports = mongoose => {
  const dbcon = require("../common/DBConnect");
    let schema = mongoose.Schema(
      {
        rolename: {
            type: String,
            required: true,
            min: 3,
            max: 255
        },
        mota: {
          type: String,
          required: true,
          min: 3,
          max: 255
        },
        dacquyen: [{
          type: mongoose.Schema.Types.ObjectId,
          ref:"menu"
       }]
      
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const role = dbcon.dbDemo.model("role", schema);
    return role;
};
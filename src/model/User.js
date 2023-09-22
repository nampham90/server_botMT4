module.exports = mongoose => {
  const dbcon = require("../common/DBConnect");
    let schema = mongoose.Schema(
      {
        name: {
            type: String,
            required: true,
            min: 6,
            max: 255
        },
        available: Boolean,
        sex: Number,
        email: {
            type: String,
            unique: true,
            required: true,
            min: 6,
            max: 225
        },
        dienthoai: {
            type: String,
            required: true,
            max: 12
        },
        zalo: String,
        diachi:String,
        avatar: {
          type: mongoose.Schema.Types.ObjectId,
          ref:"tmt010_file"
        },
        sotienno:Number,
        groupid:String,
        password: {
            type: String,
            required: true,
            min: 6,
            max: 255
        },
        role_id: [{
          type: mongoose.Schema.Types.ObjectId,
          ref:"role"
        }],
        account_id:[{
          type: mongoose.Schema.Types.ObjectId,
          ref:"account"
        }],
        menulist: [],
        phongban_id: String,
        lastLoginTime: Date
      },
      { timestamps: true }
    );
    
    schema.index({'name': 'text'});
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const user = dbcon.dbDemo.model("user", schema);
    
    return user;
};

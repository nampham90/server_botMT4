module.exports = mongoose => {
    const dbcon = require("../common/DBConnect");
    let schema = mongoose.Schema(
      {
        server: String,
        total: String,
        accKhoitao:String,
        accBalance: String,
        accEquity:String,
        accNumber:{type:String, unique:true},
        donbay:String,
        accServer: String,
        Order_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:"order"
         }]
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const account = dbcon.dbDemo.model("account", schema);
    return account;
};
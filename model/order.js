// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//     ticket: {type:String, unique:true},
//     pair: String,
//     direction: String,
//     lot: String,
//     price: String,
//     sl: String,
//     tp: String,
//     opentime: String,
//     comment: String,
//     orderProfit:String
// });

// module.exports = mongoose.model("order",orderSchema);


module.exports = mongoose => {
    let schema = mongoose.Schema(
      {
        index: Number | String,
        ticket: {type:String, unique:true},
        pair: String,
        direction: String,
        lot: String,
        price: String,
        sl: String,
        tp: String,
        opentime: String,
        comment: String,
        orderProfit:String,
        status:Boolean
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const order = mongoose.model("order", schema);
    return order;
};

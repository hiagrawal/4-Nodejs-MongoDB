//using Mongoose

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [
      {
        product: {type: Object, required: true},
        quantity: {type: Number, required: true}
      }   
  ],
  user: {
      name: {
        type: String,
        required: true
      },
      userId: {
        type:Schema.Types.ObjectId,
        ref:'User', //ref is given by mongoose to define to which collection/model this field(here userId) is related to 
        required:true
      }
  }
});

module.exports = mongoose.model('Order', orderSchema);
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: Schema.Types.String,
    required: true
  },
  imageUrl: {
    type: Schema.Types.String,
    required: true
  },
  price: {
    type: Schema.Types.Number,
    required: true
  },
  description: {
    type: Schema.Types.String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",  // we establish a reference relation to User model we have
    required: true
  }
});

// mongoose take provided model name into all lower case and turns it plural, Product -> products
module.exports = mongoose.model('Product', productSchema);

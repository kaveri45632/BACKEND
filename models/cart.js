 const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
   foodname: {

    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 1
  },
  category: {
    type: String,
    required: true,
    enum: ['veg','Non-veg']
  },
  Ratings: {
    type: Number,
    required: true,
    min: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('cart',cartSchema);

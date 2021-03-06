const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema({
  name: { type: String, maxlength: 255,required:true }, // String is shorthand for {type: String}
  price: {type:Number, required:true},
  descrtipstion: { type: String },
  images: { type: String },
  slug: { type: String },
  date: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("products", Product);

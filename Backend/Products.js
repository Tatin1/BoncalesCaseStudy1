const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  productname: String,
  quantity: String,
  price: String,
  sales: String,
  prodimage: String
})

const ProdModel = mongoose.model("Product", UserSchema)

module.exports = ProdModel
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: false }, // image n'est pas obligatoire
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);

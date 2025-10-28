const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: String,
  category: String,
  quantity: Number,
  imageUrl: String
});

module.exports = mongoose.model('Equipment', equipmentSchema);

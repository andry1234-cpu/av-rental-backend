const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  brokenQuantity: { type: Number, default: 0 },
  imageUrl: { type: String, required: true }
}, {
  // Rimuove i campi non specificati nello schema quando salva nel DB
  strict: true,
  // Rimuove __v dai risultati
  versionKey: false
});

module.exports = mongoose.model('Equipment', equipmentSchema);

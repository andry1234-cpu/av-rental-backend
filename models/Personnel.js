const mongoose = require('mongoose');

const personnelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  role: { type: String }, // Es: Tecnico, Operatore, Assistente
  phone: { type: String, required: true },
  email: { type: String },
  createdAt: { type: Date, default: Date.now }
}, {
  versionKey: false
});

module.exports = mongoose.model('Personnel', personnelSchema);

const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String }, // Es: Cavi, Staffaggi, Consumi, ecc.
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
}, {
  versionKey: false
});

module.exports = mongoose.model('Material', materialSchema);

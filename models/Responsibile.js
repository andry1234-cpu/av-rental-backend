const mongoose = require('mongoose');

const responsibileSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  phone: { type: String },
  email: { type: String },
  createdAt: { type: Date, default: Date.now }
}, {
  versionKey: false
});

module.exports = mongoose.model('Responsibile', responsibileSchema);

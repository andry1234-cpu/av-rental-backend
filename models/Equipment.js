const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: String,
  category: String,
  quantity: Number,
  imageUrl: String,
  weight: {
    value: Number,
    unit: {
      type: String,
      enum: ['kg', 'g'],
      default: 'kg'
    }
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    unit: {
      type: String,
      enum: ['cm', 'mm', 'm'],
      default: 'cm'
    }
  },
  powerConsumption: {
    value: Number,
    unit: {
      type: String,
      enum: ['W', 'kW'],
      default: 'W'
    }
  }
});

module.exports = mongoose.model('Equipment', equipmentSchema);

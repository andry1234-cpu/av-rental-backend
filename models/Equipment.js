const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: String,
  category: String,
  quantity: Number,
  imageUrl: String,
  description: String,
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
  },
  voltage: {
    value: Number,
    unit: {
      type: String,
      enum: ['V', 'mV'],
      default: 'V'
    }
  },
  technicalSpecs: {
    type: Map,
    of: String
  },
  brand: String,
  model: String,
  year: Number
});

module.exports = mongoose.model('Equipment', equipmentSchema);

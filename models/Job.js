const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  responsibile: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Responsibile',
    required: true 
  },
  personnel: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Personnel'
  }],
  materials: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Material'
  }],
  equipment: [{
    equipmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipment' },
    quantity: { type: Number, default: 1 }
  }],
  googleCalendarEventId: { type: String }, // ID dell'evento su Google Calendar
  status: { type: String, enum: ['draft', 'confirmed', 'completed', 'cancelled'], default: 'draft' },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  versionKey: false
});

module.exports = mongoose.model('Job', jobSchema);

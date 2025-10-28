const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connessione a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connessione a MongoDB riuscita'))
.catch(err => console.error('❌ Errore MongoDB:', err));

// Modello Equipment
const equipmentSchema = new mongoose.Schema({
  name: String,
  category: String,
  quantity: Number,
  imageUrl: String
});

const Equipment = mongoose.model('Equipment', equipmentSchema);

// Rotta GET /api/equipment
app.get('/api/equipment', async (req, res) => {
  try {
    const items = await Equipment.find();
    res.json(items);
  } catch (err) {
    console.error('Errore nel recupero dati:', err);
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

// Rotta POST /api/equipment
app.post('/api/equipment', async (req, res) => {
  try {
    const newItem = new Equipment(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    console.error('Errore nel salvataggio:', err);
    res.status(400).json({ error: 'Errore nella creazione dell’oggetto' });
  }
});

// Rotta di test
app.get('/', (req, res) => {
  res.send('Backend AV Rental attivo 🚀');
});

// Avvio server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server avviato su http://localhost:${PORT}`);
});

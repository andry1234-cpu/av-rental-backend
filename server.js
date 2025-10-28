const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express(); // ⚠️ Questa riga deve venire prima di app.use()

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
    res.status(500).json({ error: 'Errore nel recupero dati' });
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

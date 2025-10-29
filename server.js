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
.then(() => console.log('✅ Connessione a MongoDB riuscita! [Auto-deploy test]'))
.catch(err => console.error('❌ Errore MongoDB:', err));

// Import delle routes
const equipmentRoutes = require('./routes/equipment');

// Utilizzo delle routes
app.use('/api/equipment', equipmentRoutes);

// Rotta principale per verifica server
app.get('/', (req, res) => {
  res.json({ message: 'Backend AV Rental attivo 🚀' });
});

// Rotta POST /api/equipment
app.post('/api/equipment', async (req, res) => {
  try {
    const newItem = new Equipment(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    console.error('Errore nel salvataggio:', err);
    res.status(400).json({ error: "Errore nella creazione dell'oggetto" });
  }
});

// Rotta PUT /api/equipment/:id
app.put('/api/equipment/:id', async (req, res) => {
  try {
    const updatedItem = await Equipment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ error: "Articolo non trovato" });
    }
    res.json(updatedItem);
  } catch (err) {
    console.error("Errore nell'aggiornamento:", err);
    res.status(400).json({ error: "Errore nell'aggiornamento dell'oggetto" });
  }
});

// Rotta DELETE /api/equipment/:id
app.delete('/api/equipment/:id', async (req, res) => {
  try {
    const deletedItem = await Equipment.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Articolo non trovato" });
    }
    res.json({ message: "Articolo eliminato con successo" });
  } catch (err) {
    console.error("Errore nell'eliminazione:", err);
    res.status(400).json({ error: "Errore nell'eliminazione dell'oggetto" });
  }
});

// Rotta PUT /api/equipment/:id
app.put('/api/equipment/:id', async (req, res) => {
  try {
    const updatedItem = await Equipment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ error: 'Articolo non trovato' });
    }
    res.json(updatedItem);
  } catch (err) {
    console.error('Errore nell\'aggiornamento:', err);
    res.status(400).json({ error: 'Errore nell\'aggiornamento dell\'oggetto' });
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

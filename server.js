const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Log della connessione MongoDB
console.log('Tentativo di connessione a MongoDB...');

// Connessione a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('✅ Connessione a MongoDB riuscita!');
  
  try {
    // Verifica lo stato del database
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections presenti:', collections.map(c => c.name));
    
    // Verifica i dati esistenti
    const documentsCount = await Equipment.countDocuments();
    console.log(`Numero di articoli nel database: ${documentsCount}`);
    
    if (documentsCount > 0) {
      const esempio = await Equipment.findOne();
      console.log('Schema documento:', Object.keys(esempio._doc));
      console.log('Categorie presenti:', await Equipment.distinct('category'));
    } else {
      console.log('⚠️ Database vuoto');
    }
  } catch (dbError) {
    console.error('Errore nella verifica del database:', dbError);
  }
  const count = await Equipment.countDocuments();
  if (count === 0) {
    console.log('Database vuoto, carico i dati di esempio...');
    // Importa i dati di esempio
    const { exampleData } = require('./scripts/seedData');
    try {
      await Equipment.insertMany(exampleData);
      console.log('✅ Dati di esempio caricati con successo');
    } catch (err) {
      console.error('❌ Errore nel caricamento dei dati di esempio:', err);
    }
  } else {
    console.log(`Database contiene già ${count} articoli`);
  }
})
.catch(err => console.error('❌ Errore MongoDB:', err));

// Import delle routes
const equipmentRoutes = require('./routes/equipment');

// Endpoint di diagnostica
app.get('/api/status', async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connesso' : 'disconnesso';
    const documentsCount = await Equipment.countDocuments();
    const categories = await Equipment.distinct('category');
    
    res.json({
      status: 'online',
      database: {
        status: dbStatus,
        documentsCount,
        categories
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

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

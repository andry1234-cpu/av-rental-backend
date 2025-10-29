const express = require('express');
const router = express.Router();
const Equipment = require('../models/Equipment');
const mongoose = require('mongoose');

// GET /api/equipment
router.get('/', async (req, res) => {
  try {
    console.log('Stato connessione MongoDB:', mongoose.connection.readyState);
    console.log('URI MongoDB:', process.env.MONGO_URI);
    console.log('Tentativo di recupero equipment...');
    const items = await Equipment.find();
    console.log('Equipment trovati:', items.length);
    res.json(items);
  } catch (err) {
    console.error('Stack errore:', err.stack);
    console.error('Dettagli errore:', {
      name: err.name,
      message: err.message,
      code: err.code
    });
    res.status(500).json({ 
      error: 'Errore nel recupero dati',
      details: err.message,
      mongoState: mongoose.connection.readyState 
    });
  }
});

module.exports = router;

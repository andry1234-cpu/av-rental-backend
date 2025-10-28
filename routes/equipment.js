const express = require('express');
const router = express.Router();
const Equipment = require('../models/Equipment');

// GET /api/equipment
router.get('/', async (req, res) => {
  try {
    const items = await Equipment.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Errore nel recupero dati' });
  }
});

module.exports = router;

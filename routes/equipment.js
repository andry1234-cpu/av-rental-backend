const express = require('express');
const router = express.Router();
const Equipment = require('../models/Equipment');
const Job = require('../models/Job');
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

// GET /api/equipment/stats/dashboard - Statistiche per la dashboard
router.get('/stats/dashboard', async (req, res) => {
  try {
    // Totale unità in magazzino (quantity - brokenQuantity) per tutti gli articoli
    const allEquipment = await Equipment.find();
    const totalItems = allEquipment.length;
    
    // Totale quantità in magazzino (somma quantity - brokenQuantity)
    const totalQuantity = allEquipment.reduce((sum, item) => {
      const available = item.quantity - (item.brokenQuantity || 0);
      return sum + Math.max(available, 0);
    }, 0);
    
    // Totale unità guaste
    const brokenQuantity = allEquipment.reduce((sum, item) => sum + (item.brokenQuantity || 0), 0);
    
    // Totale unità in utilizzo (su lavori attivi/confirmed)
    let inUseQuantity = 0;
    const activeJobs = await Job.find({ status: { $in: ['draft', 'confirmed'] } }).populate('equipment.equipmentId');
    
    // Mappa equipmentId -> quantità in utilizzo
    const equipmentInUseMap = {};
    activeJobs.forEach(job => {
      if (job.equipment && job.equipment.length > 0) {
        job.equipment.forEach(eq => {
          const eqId = eq.equipmentId ? eq.equipmentId._id.toString() : null;
          if (eqId) {
            equipmentInUseMap[eqId] = (equipmentInUseMap[eqId] || 0) + (eq.quantity || 0);
            inUseQuantity += eq.quantity || 0;
          }
        });
      }
    });
    
    // In magazzino = quantità disponibili NON assegnate a lavori attivi
    let inStockQuantity = 0;
    allEquipment.forEach(item => {
      const available = item.quantity - (item.brokenQuantity || 0);
      const inUse = equipmentInUseMap[item._id.toString()] || 0;
      inStockQuantity += Math.max(available - inUse, 0);
    });
    
    // Conteggio categorie
    const categories = [...new Set(allEquipment.map(item => item.category))].length;
    
    // Conteggio lavori attivi
    const activeJobsCount = activeJobs.length;
    
    res.json({
      totalItems: totalQuantity,
      totalArticles: totalItems,
      totalCategories: categories,
      inStock: inStockQuantity,
      inUse: inUseQuantity,
      broken: brokenQuantity,
      activeJobs: activeJobsCount,
      equipment: allEquipment
    });
  } catch (err) {
    console.error('Errore nel calcolo statistiche dashboard:', err);
    res.status(500).json({ 
      error: 'Errore nel calcolo statistiche',
      details: err.message 
    });
  }
});

module.exports = router;

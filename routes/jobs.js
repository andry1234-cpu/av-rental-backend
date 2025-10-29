const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const Responsibile = require('../models/Responsibile');
const Personnel = require('../models/Personnel');
const Material = require('../models/Material');

// ===== JOBS =====

// GET tutti i lavori
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate('responsibile')
      .populate('personnel')
      .populate('materials')
      .populate('equipment.equipmentId')
      .sort({ startDate: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET singolo lavoro
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('responsibile')
      .populate('personnel')
      .populate('materials')
      .populate('equipment.equipmentId');
    
    if (!job) return res.status(404).json({ error: 'Lavoro non trovato' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST nuovo lavoro
router.post('/', async (req, res) => {
  try {
    const { name, startDate, endDate, location, responsibile, personnel, materials, equipment, notes } = req.body;
    
    const newJob = new Job({
      name,
      startDate,
      endDate,
      location,
      responsibile,
      personnel: personnel || [],
      materials: materials || [],
      equipment: equipment || [],
      notes,
      status: 'draft'
    });
    
    const saved = await newJob.save();
    const populated = await Job.findById(saved._id)
      .populate('responsibile')
      .populate('personnel')
      .populate('materials');
    
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT aggiorna lavoro
router.put('/:id', async (req, res) => {
  try {
    const updated = await Job.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    ).populate('responsibile').populate('personnel').populate('materials');
    
    if (!updated) return res.status(404).json({ error: 'Lavoro non trovato' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE lavoro
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Job.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Lavoro non trovato' });
    res.json({ message: 'Lavoro eliminato', deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== RESPONSIBILI =====

// GET responsabili
router.get('/responsibili/list', async (req, res) => {
  try {
    const responsibili = await Responsibile.find().sort({ name: 1 });
    res.json(responsibili);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST nuovo responsabile
router.post('/responsibili/create', async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    
    const newResponsibile = new Responsibile({ name, phone, email });
    const saved = await newResponsibile.save();
    
    res.status(201).json(saved);
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ error: 'Responsabile già esiste' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// ===== PERSONNEL =====

// GET personale
router.get('/personnel/list', async (req, res) => {
  try {
    const personnel = await Personnel.find().sort({ name: 1 });
    res.json(personnel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST nuovo personale
router.post('/personnel/create', async (req, res) => {
  try {
    const { name, role, phone, email } = req.body;
    
    const newPersonnel = new Personnel({ name, role, phone, email });
    const saved = await newPersonnel.save();
    
    res.status(201).json(saved);
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ error: 'Personale già esiste' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// ===== MATERIALS =====

// GET materiali
router.get('/materials/list', async (req, res) => {
  try {
    const materials = await Material.find().sort({ name: 1 });
    res.json(materials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST nuovo materiale
router.post('/materials/create', async (req, res) => {
  try {
    const { name, category, description } = req.body;
    
    const newMaterial = new Material({ name, category, description });
    const saved = await newMaterial.save();
    
    res.status(201).json(saved);
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ error: 'Materiale già esiste' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// ===== EQUIPMENT (from magazzino) =====

// GET equipment dalla lista di magazzino
router.get('/equipment/list', async (req, res) => {
  try {
    const Equipment = require('../models/Equipment');
    const equipment = await Equipment.find().sort({ name: 1 });
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET lavori attivi oggi
router.get('/stats/today', async (req, res) => {
  try {
    // Calcola inizio e fine della giornata odierna
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Trova lavori che hanno almeno un giorno di overlap con oggi
    // Un lavoro è attivo oggi se: startDate <= oggi AND endDate >= oggi
    const activeJobsToday = await Job.find({
      status: { $in: ['draft', 'confirmed'] },
      startDate: { $lt: tomorrow },
      endDate: { $gte: today }
    })
      .populate('responsibile')
      .populate('personnel')
      .populate('materials')
      .populate('equipment.equipmentId')
      .sort({ startDate: 1 });
    
    res.json({
      activeJobsToday: activeJobsToday.length,
      jobs: activeJobsToday
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

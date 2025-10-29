const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const Equipment = require('../models/Equipment');

// Parse CSV manualmente (semplice)
function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());
  
  if (lines.length === 0) {
    console.error('File CSV vuoto');
    return [];
  }

  // Estrai header
  const headers = lines[0].split(',').map(h => h.trim());
  
  // Converti righe in oggetti
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const row = {};
    
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    
    // Converti quantity a numero
    if (row.quantity) {
      row.quantity = parseInt(row.quantity, 10);
    }
    
    data.push(row);
  }
  
  return data;
}

async function importEquipment() {
  try {
    // Connetti a MongoDB
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/av-rental';
    console.log('Connessione a MongoDB:', mongoUri);
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connesso a MongoDB');

    // Leggi il CSV
    const csvPath = path.join(__dirname, 'equipment_template.csv');
    const equipmentData = parseCSV(csvPath);
    
    console.log('Equipment da importare:', equipmentData.length);

    // Pulisci il database (opzionale - commenta se vuoi preservare i dati)
    // await Equipment.deleteMany({});
    // console.log('Database pulito');

    // Inserisci i nuovi equipment
    const result = await Equipment.insertMany(equipmentData);
    console.log('Equipment importati:', result.length);
    
    result.forEach(item => {
      console.log(`✓ ${item.name} (${item.category}) - Qty: ${item.quantity}`);
    });

    await mongoose.connection.close();
    console.log('Connessione chiusa');
  } catch (error) {
    console.error('Errore durante l\'importazione:', error);
    process.exit(1);
  }
}

importEquipment();

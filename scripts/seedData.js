const mongoose = require('mongoose');
require('dotenv').config();
const Equipment = require('./models/Equipment');

const exampleData = [
  {
    name: 'Shure SM58',
    category: 'Audio',
    quantity: 4,
    imageUrl: 'https://media.sweetwater.com/api/i/q-82__ha-18c741397574fbc2__hmac-1d36e9f5dfe5a1467dd2756015644727ef9fa40f/images/items/750/SM58-large.jpg',
    description: 'Microfono dinamico cardioide professionale',
    weight: {
      value: 0.298,
      unit: 'kg'
    },
    dimensions: {
      length: 16.2,
      width: 5.1,
      height: 5.1,
      unit: 'cm'
    },
    brand: 'Shure',
    model: 'SM58',
    technicalSpecs: {
      frequencyResponse: '50 Hz - 15 kHz',
      impedance: '300Ω @ 1kHz',
      sensitivity: '-54.5 dBV/Pa (1.85 mV)',
      pattern: 'Cardioide'
    }
  },
  {
    name: 'QSC K12.2',
    category: 'Audio',
    quantity: 2,
    imageUrl: 'https://media.sweetwater.com/api/i/q-82__ha-0c8d8f87fbc353d8__hmac-45a8932b2c1ff49a0f1f3c642aa53cc58fde93ff/images/items/750/K12.2-large.jpg',
    description: 'Diffusore attivo professionale 2000W',
    weight: {
      value: 17.7,
      unit: 'kg'
    },
    dimensions: {
      length: 63.5,
      width: 35.6,
      height: 35.6,
      unit: 'cm'
    },
    powerConsumption: {
      value: 2000,
      unit: 'W'
    },
    voltage: {
      value: 230,
      unit: 'V'
    },
    brand: 'QSC',
    model: 'K12.2',
    technicalSpecs: {
      maxSPL: '132 dB',
      frequencyRange: '45 Hz - 20 kHz',
      coverage: '75° Axisymmetric',
      inputs: '2x XLR-1/4" combo'
    }
  }
];

// Connessione a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('✅ Connessione a MongoDB riuscita');
  
  try {
    // Rimuove i dati esistenti
    await Equipment.deleteMany({});
    console.log('Database pulito');

    // Inserisce i nuovi dati
    await Equipment.insertMany(exampleData);
    console.log('Dati di esempio inseriti con successo');
  } catch (err) {
    console.error('Errore nell\'inserimento dei dati:', err);
  } finally {
    mongoose.disconnect();
  }
})
.catch(err => console.error('❌ Errore MongoDB:', err));
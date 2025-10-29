const mongoose = require('mongoose');
require('dotenv').config();
const Equipment = require('../models/Equipment');

const exampleData = [
  // AUDIO
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
  },
  // VIDEO
  {
    name: 'Sony PXW-Z190',
    category: 'Video',
    quantity: 2,
    imageUrl: 'https://pro.sony/s3/2018/04/16020225/pxw-z190v_4k_main.jpg',
    description: 'Videocamera professionale 4K',
    weight: {
      value: 2.3,
      unit: 'kg'
    },
    dimensions: {
      length: 28.5,
      width: 18.9,
      height: 15.3,
      unit: 'cm'
    },
    powerConsumption: {
      value: 18,
      unit: 'W'
    },
    brand: 'Sony',
    model: 'PXW-Z190',
    technicalSpecs: {
      sensor: '3-CMOS 1/3"',
      resolution: '4K (3840x2160)',
      zoom: '25x ottico',
      storage: 'Dual SD card slots'
    }
  },
  // LUCI
  {
    name: 'Aputure 300d III',
    category: 'Luci',
    quantity: 3,
    imageUrl: 'https://www.aputure.com/wp-content/uploads/2019/09/300diii_1.png',
    description: 'Illuminatore LED daylight professionale',
    weight: {
      value: 4.8,
      unit: 'kg'
    },
    dimensions: {
      length: 36.8,
      width: 28.5,
      height: 21.6,
      unit: 'cm'
    },
    powerConsumption: {
      value: 350,
      unit: 'W'
    },
    voltage: {
      value: 220,
      unit: 'V'
    },
    brand: 'Aputure',
    model: '300d III',
    technicalSpecs: {
      outputPower: '70,000 lux @ 1m',
      colorTemp: '5500K ±200K',
      dimming: '0-100%',
      control: 'DMX / Wireless'
    }
  },
  // STRUTTURE
  {
    name: 'Global Truss F34',
    category: 'Strutture',
    quantity: 10,
    imageUrl: 'https://www.globaltruss.com/images/products/F34.jpg',
    description: 'Traliccio in alluminio professionale',
    weight: {
      value: 7.2,
      unit: 'kg'
    },
    dimensions: {
      length: 200,
      width: 29,
      height: 29,
      unit: 'cm'
    },
    brand: 'Global Truss',
    model: 'F34',
    technicalSpecs: {
      material: 'Alluminio EN-AW 6082 T6',
      carico: 'Max 750kg/m',
      connettori: 'Conical',
      tubo: '50mm x 2mm'
    }
  }
];

// Se lo script viene eseguito direttamente
if (require.main === module) {
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
}

// Esporta i dati di esempio per l'uso in altri file
module.exports = { exampleData };

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
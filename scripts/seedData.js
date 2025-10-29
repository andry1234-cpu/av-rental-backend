const mongoose = require('mongoose');
require('dotenv').config();
const Equipment = require('../models/Equipment');

const exampleData = [
  {
    name: 'Shure SM58',
    category: 'Audio',
    quantity: 4,
    imageUrl: 'https://media.sweetwater.com/api/i/q-82__ha-18c741397574fbc2__hmac-1d36e9f5dfe5a1467dd2756015644727ef9fa40f/images/items/750/SM58-large.jpg'
  },
  {
    name: 'QSC K12.2',
    category: 'Audio',
    quantity: 2,
    imageUrl: 'https://media.sweetwater.com/api/i/q-82__ha-0c8d8f87fbc353d8__hmac-45a8932b2c1ff49a0f1f3c642aa53cc58fde93ff/images/items/750/K12.2-large.jpg'
  },
  {
    name: 'Sony PXW-Z190',
    category: 'Video',
    quantity: 2,
    imageUrl: 'https://pro.sony/s3/2018/04/16020225/pxw-z190v_4k_main.jpg'
  },
  {
    name: 'Aputure 300d III',
    category: 'Luci',
    quantity: 3,
    imageUrl: 'https://www.aputure.com/wp-content/uploads/2019/09/300diii_1.png'
  },
  {
    name: 'Global Truss F34',
    category: 'Strutture',
    quantity: 10,
    imageUrl: 'https://www.globaltruss.com/images/products/F34.jpg'
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
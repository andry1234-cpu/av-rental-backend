const mongoose = require('mongoose');
require('dotenv').config();
const Equipment = require('../models/Equipment');

async function cleanDatabase() {
  try {
    console.log('Connessione a MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connesso a MongoDB');

    // Recupera tutti i documenti
    const documents = await Equipment.find({});
    console.log(`Trovati ${documents.length} documenti da pulire`);

    // Per ogni documento, tieni solo i campi dello schema e salva
    for (const doc of documents) {
      const cleanDoc = {
        name: doc.name,
        category: doc.category,
        quantity: doc.quantity,
        imageUrl: doc.imageUrl
      };

      // Aggiorna il documento con solo i campi necessari
      await Equipment.findByIdAndUpdate(doc._id, cleanDoc);
      console.log(`Pulito documento: ${doc.name}`);
    }

    console.log('✅ Pulizia completata con successo');
  } catch (error) {
    console.error('❌ Errore durante la pulizia:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnesso da MongoDB');
  }
}

// Esegui lo script
cleanDatabase();
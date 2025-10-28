const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Connessione a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connessione a MongoDB riuscita'))
.catch(err => console.error('❌ Errore MongoDB:', err));

// Rotta di test
app.get('/', (req, res) => {
  res.send('Backend AV Rental attivo 🚀');
});

app.listen(PORT, () => {
  console.log(`🟢 Server avviato su porta ${PORT}`);
});

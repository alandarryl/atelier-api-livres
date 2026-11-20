require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'books-api' });
});

app.use('/api/books', bookRoutes);

app.use((err, req, res, next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).json({ message: err.message });
  }
  if (err.code === 11000) {
    return res.status(409).json({ message: 'ISBN déjà existant' });
  }
  console.error(err);
  res.status(500).json({ message: 'Erreur interne du serveur' });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API Livres démarrée sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Échec de démarrage:', err.message);
    process.exit(1);
  });

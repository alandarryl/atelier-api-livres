require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

app.get('/health', (req, res) =>{
    res.status(200).json({message: 'API is running'});
})

app.use('/api/books', bookRoutes);




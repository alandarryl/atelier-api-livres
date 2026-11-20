const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');



const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) =>{
    res.status(200).json({message: 'API is running'});
})

app.use('/api/books', bookRoutes);

connectDB()
    .then(() => {
        app.listen(PORT, () =>{
            console.log(`Server is running on port ${PORT}`);
        })
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    });
    


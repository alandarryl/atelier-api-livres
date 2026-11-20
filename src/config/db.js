


const mongoose = require('mongoose');

const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    if(!uri){
        throw new Error('MONGO_URI is not defined in environment variables');
    }
    await mongoose.connect(uri);
    console.log('Connection à MongoDB reussie');
};

module.exports = connectDB;


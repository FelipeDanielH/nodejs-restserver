const mongoose = require('mongoose');
require('dotenv');

const dbConnection = async() =>{
    try{
         await mongoose.connect( process.env.MONGO_CNN );

         console.log('Base de datos ONLINE')
    }catch (error){
        console.log(error);
        throw new Error('Error a la hora iniciar la base de datos');
    }
}

module.exports = {
    dbConnection
}
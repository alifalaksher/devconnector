const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURL')

const connectDB = async ()=>{
    try {
        
        await mongoose.connect(db,{
            useNewURLParser: true
        });
        console.log*"MongoDB Connected"
    } catch (error) {
        console.error(error.message)
        process.exit(1);
    }
}

module.exports = connectDB;
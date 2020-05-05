const mongoose = require('mongoose');
const connectDB = async () => {
    const conn = await mongoose.connect('mongodb://127.0.0.1/myshop', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true

    });
    console.log(`Mongo Connected :${conn.connection.host}`)
};
module.exports = connectDB;
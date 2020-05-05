//Import Express
const express = require('express');
const connectDB = require('./config/connectDB');
//Enable cookie parse
const cookieParser = require('cookie-parser');
//Import Dotenv
const dotenv = require('dotenv');
//Load auth
const auth = require('./routes/auth');
//Load env var
dotenv.config({ path: './config/config.env' });
//Connect to db
connectDB();

const app = express();

//Body Parser
app.use(express.json());
//Cookie parser middleware
app.use(cookieParser());
//Route
app.use('/api', auth);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Running on port ${PORT}`));

//Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    //Close server and exit
    server.close(() => process.exit(1));
});
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const auth = require('./routes/auth')
const cors = require('cors');
const session = require('express-session')

require('dotenv').config()

//check in, env folder for a specific port to run on
const port = process.env.PORT || 3000;

//the database is actually named yourDatabaseName
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//keeps our database connected to the express script while a file is running
//emits various events, one of them being open
const db = mongoose.connection;

//event listener for MongoDB connection object (db in our case)
//for development purposes to let dev know that we are indeed connected to database
db.once('open', ()=>{
    console.log('Connected to MongoDB');
});

//sets up persistant listening in order to always listen for the error event while the connection is running
db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

//enabling express to use cors as a middleware to allow front and back end communication 
app.use(cors({
    //for production, make sure to replace with actual front end app URL 
    origin: '*', 
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type'] 
}));

//another middleware activation that has access to req and res objects that allows express
//to send and recieve data in json format
app.use(express.json())

//middleware to establish user sesisons
//CHECK! do i need a proxy in order to allow sessions to persist and maintain during page changes
// and refreshes??
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Set to true if using HTTPS
  }));

//this is the prefix that is necessary in react api calls.  can be removed, but make certain 
//to change the call on the frontend
app.use('/api/auth', auth)

//crucial for express server -- tells app to listn for incoming request on a specific port
//our defined port (above) is 3000 beause ports stored in .env are null
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


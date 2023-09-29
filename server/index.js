const express = require('express');
const mongoose = require('mongoose');
const app = express();
const auth = require('./routes/auth')
const cors = require('cors');
const session = require('express-session')

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
    useNewUrlParser: true,
useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', ()=>{
    console.log('Connected to MongoDB');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type'] 
}));

app.use(express.json())

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Set to true if using HTTPS
  }));

app.use('/api/auth', auth)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


const express = require('express');
const mongoose = require('mongoose');
const app = express();
const auth = require('./routes/auth')
const cors = require('cors');

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

app.use(express.json())
app.use(cors())

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

app.use('/api/auth', auth)
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const users = [
  {
    email: 'admin@example.com',
    password: bcrypt.hashSync('password123', 10),
    role: 'admin',
  },
  {
    email: 'employee@example.com',
    password: bcrypt.hashSync('password123', 10),
    role: 'employee',
  },
];

User.insertMany(users)
  .then(() => {
    console.log('Data seeded!');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error seeding data: ', error);
    mongoose.connection.close();
  });

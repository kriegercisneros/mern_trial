const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const users = require('../models/User')

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
      console.log('recieved login request', {email, password})
      const user = await users.findOne({ email });
    
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      } 
    
      const passwordMatch = await bcrypt.compare(password, user.password);
    
      if (passwordMatch) {
        console.log('Authentication successful');
      } else {
        console.log('Authentication failed');
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;

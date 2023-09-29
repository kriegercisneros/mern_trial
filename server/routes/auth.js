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
        req.session.userId = user._id;
        req.session.isAuthenticated = true;

        res.status(200).json({ message: `Login successful, session_id is ${req.session.userId}` });
      } else {
        console.log('Authentication failed');
        res.status(401).json({ message: 'Incorrect password' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});


router.post('/logout', async (req, res) => {

})

module.exports = router;

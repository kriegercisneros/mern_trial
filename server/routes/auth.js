const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const users = require('../models/User')

//function that returns a promise, using await to findOne by email and also await to 
//compare with bcrypt password passed in and password in user table

//two objects are required in express: request (req incoming) and response (resp outgoing)
    //req contains info about the HTTP request that was made from react; here is email and password
    //res sends back HTTP to client to set resp headers, etc
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


router.post('/logout', (req, res) => {
    if(req.session){
        req.session.destroy(err=>{
            if(err){
                return res.status(500).json({message:'internal server error'});
            }
            res.status(200).json({message:'logged out successfully'})
        });
    }else {
        res.status(400).json({message:'Not logged in'})
    }
})

module.exports = router;

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const db = require('../config/db.js');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body;

    // Form validation
    if (!email || !password) {
      return res.status(400).json({
        message: 'Both email and password are required.'
      });
    }

    email = email.trim().toLowerCase();

    //Checking user existing

    const loginQuery = `select * from users where email = ?`;

    const [user] = await db.query(loginQuery, [email]);

    if (!user.length) {
      return res.status(401).json({
        message: 'Incorrect email or password',
      })
    }
    
    //checking the password

    const isMatch = await bcrypt.compare(
      password,
      user[0].password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: 'Incorrect email or password',
      });
    }

    //Generating token
    const token = jwt.sign(
      {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'
      }
    );

    //stores jwt in cookie

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000
    });
    

    return res.status(200).json({
      message: 'Login successful',

    });
    console.log("Email:", email);
    console.log("Password:", password);


  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });

  }
});


module.exports = router;
const bcrypt = require('bcrypt');
const express = require('express');
// const jwt = require('jsonwebtoken');
const db = require('../config/db');

const router = express.Router();

router.post('/signup', async (req,res) =>{
  try{
    let {name, email, password} = req.body;


    //checking the fields
    if(!name || !email || !password){
      return res.status(400).json({
        message: 'All fields are required'
      });
    }
      email = email.trim().toLowerCase();

    //checking the user existing or not
    const [user] = await db.query(
      `select * from users where email = ?`, [email]
    );

    if(user.length > 0){
      return res.status(409).json({
        message:'User already exists',
      });
    }

    //Hashing th password

    const hashPassword = await bcrypt.hash(password, 12);

    //Inserting user into db

    const insertQuery = `insert into users(name, email, password) values(?,?,?)`;

    await db.query(insertQuery,[name, email, hashPassword]);

    res.status(201).json({
      message:'User created successfully..'
    });



  }catch(err){
    console.log(err);
    res.status(500).json({
      message:'Internal Server Error'
    });
  }

});

module.exports = router;
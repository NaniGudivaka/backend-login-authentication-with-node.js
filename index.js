const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const bcrypt = require('bcrypt');

//importing db.js

const db = require('./config/db.js');

//importing signup route
const signupRoute = require('./routes/signup.js');
//import login route
const loginRoute = require('./routes/login.js');
//import verifytoken module

const verifyToken = require('./middleware/verifyToken.js');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: "https://login-authentication-using-node-js.vercel.app",
  credentials: true,
})
);

app.use(cookieParser());
app.use(helmet());

//Ratelimit creation

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: 'Too many signup/login attempts. Please try again later.',
});

// app.use(limiter);

//checking database connections

async function testDB(){
  try{
    const con = await db.getConnection();
    console.log('DataBase connected successfully..');
    con.release();

  }catch(err){
    console.log(err);
  }

}
testDB();
//protected route
app.get('/auth/dashboard', verifyToken, (req, res) =>{
  res.status(200).json({
    message: 'Welcome to DashBoard',
    user: req.user
  });
});

//signup rote
app.use('/auth', limiter, signupRoute);
//login route
app.use('/auth', limiter, loginRoute);

//Checking the server
app.get('/', (req, res) =>{
  res.send('Backend is Running....')
});


//Creating server
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
  console.log(`Server Started Successfully on Port ${PORT}`);
});
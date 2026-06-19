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
});

app.use(limiter);

//checking database connections

async function textDB(){
  try{
    const con = await db.getConnection();
    console.log('DataBase connected successfully..');
    con.release();

  }catch(err){
    console.log(err);
  }

}
textDB();

//Checking the server
app.get('/', (req, res) =>{
  res.send('Backend is Running....')
});


//Creating server
const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
  console.log(`Server Started Successfully on Port ${PORT}`);
});
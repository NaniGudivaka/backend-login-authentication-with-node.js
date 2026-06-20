const express = require('express');

const router = express.Router();

router.post('/logout', (req, res) =>{
  res.clearCookie('token');

 return res.status(200).json({
    message:'Logout Successful',
  });
});

module.exports = router;
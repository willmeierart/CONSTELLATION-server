var express = require('express');
var router = express.Router();
const dotenv = require('dotenv').config()
const bcrypt = require('bcrypt')

/* GET home page. */
router.post('/auth', function(req, res, next) {
    const password = bcrypt.hash(req.body.password, 4)
    const storedPassword = bcrypt.hash(process.env.PASSWORD, 4)
    const setCookies = (req, res) => {
    res.cookie("connected", bcrypt.hash(req.body.password, 4), {
      httpOnly: true,
      secure: true,
      signed: true
    })
    res.json({
      password: password,
      message: "Enjoy!"
    })
  }
  bcrypt.compare(password, storedPassword)
    .then(result => {
      if(result){
        setCookies(req, res)
      } else {
        next(new Error("Invalid Password"))
      }
    })
  })

module.exports = router;

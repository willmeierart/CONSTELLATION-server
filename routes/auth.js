var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  console.log(req.body, process.env.PASSWORD);
    const setCookies = (req, res) => {
    res.cookie("connected", req.body.password, {
      secure: true,
      signed: true
    })
    res.json({
      message: "Enjoy!"
    })
  }
  if(req.body.password == process.env.PASSWORD){
    setCookies(req, res)
  } else {
    next(new Error("Invalid Password"))
  }
  })

module.exports = router;

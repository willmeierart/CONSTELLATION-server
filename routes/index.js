var express = require('express');
var router = express.Router();
var queries = require('../db/queries')

/* GET home page. */


router.get('/thumbnails', (req,res) => {
  queries.getAll().then(picture => {
    res.json(picture);
  })
})

router.post('/thumbnails', (req, res, next) => {
    queries.create(req.body).then(picture => {
      //console.log(picture)
      res.json(picture);
    })
  })

module.exports = router;

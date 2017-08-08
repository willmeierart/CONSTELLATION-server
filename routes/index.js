var express = require('express');
var router = express.Router();
var queries = require('../db/queries');

router.get('/thumbnails', (req,res) => {
  queries.getAll().then(picture => {
    res.json(picture);
  });
});

router.post('/thumbnails', (req, res) => {
    queries.create(req.body).then(picture => {
      //console.log(picture)
      res.json(picture);
    });
  });

router.delete('/thumbnails/:id', function(req, res) {
  queries.deletePictureById(req.params.id).then(response => {
  res.json(response);
  });
});

module.exports = router;

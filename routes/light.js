var express = require('express');
var router = express.Router();

/* GET light page. */
router.get('/', function(req, res, next) {
  res.render('light', { title: 'YoaYoa-light' });
});

module.exports = router;

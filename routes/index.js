var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '有啊有啊聚合搜索' });
});

module.exports = router;

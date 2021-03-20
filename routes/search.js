var express = require('express');
var yoa = require('../yoayoaSearch');
var router = express.Router();

router.post('/:site_name', async (req, res, next) => {
  console.log(`开始请求${req.params.site_name}……`);
  result_html = await yoa.oneSearch(req.body.search,req.params.site_name).catch(err=>{console.error(err);});
  const result = {
    html:result_html
  };
  res.send(result);
  console.log(`${req.params.site_name}数据已返回给客户端`);
});

module.exports = router;

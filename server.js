const yoa = require('./yoayoaSearch.js');

const express = require('express');
app = express();
app.use('/static',express.static('static'));
app.use(require('cors')());
app.use(express.json());
app.post('/api/:site_name', async (req, res) => {
  console.log(`开始请求${req.params.site_name}……`);
  result_html = await yoa.oneSearch(req.body.search,req.params.site_name).catch(err=>{console.error(err);});
  const result = {
    html:result_html
  };
  // console.log(result_html);
  res.send(result);
  console.log(`${req.params.site_name}数据已返回给客户端`);
});
app.get('/home', (req, res) => {
  const msg = 'ok'
  res.send(msg);
});
app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
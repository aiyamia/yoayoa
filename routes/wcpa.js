const request = require('request');

my_wcpa_middleware = async(req, res, next)=> {
  real_url = "https://www.worldcat.org/wcpa"+req.url;
  var options = {
    url: real_url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36'
    }
  }
  if(real_url.endsWith('.gif')|real_url.endsWith('.png')){
    options.encoding='binary' //非常重要，没有就传不了图
    request(options, function (error, response, body) {
      res.set(response.headers)
      res.end(body, 'binary')//非常重要，没有就传不了图
    });
  }else{
    request(options, function (error, response, body) {
      res.set(response.headers)
      res.end(body);
    });
  }
}
module.exports = my_wcpa_middleware



const request = require('request');

my_autocomplete_middleware = async(req, res, next)=> {
  real_url = "https://www.worldcat.org/autocomplete"+req.url;
  const options = {
    url: real_url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36'
    }
  }
  request(options, function (error, response, body) {
    res.set(response.headers)
    res.send(body);
  });
}

module.exports = my_autocomplete_middleware



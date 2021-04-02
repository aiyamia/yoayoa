var express = require('express');
var router = express.Router();
const request = require('request');

router.get('/worldcat/search', async(req, res, next)=> {
  real_url = req.url.replace(/\/worldcat/, "https://www.worldcat.org");
  
  const options = {
    url: real_url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36'
    }
  }
  request(options, function (error, response, body) {
    res.set(response.headers)
    body = body.replace(/(<!-- OneTrust Cookies Consent Notice start \(COOKIECONSENT.JSP\) -->.+<!-- OneTrust Cookies Consent Notice end \(COOKIECONSENT\.JSP\)  -->)/s, "")
    body = body.replace(/<script src='https:\/\/www\.google\.com\/recaptcha\/api\.js'><\/script>/,'')
    res.send(body);
  });
});

module.exports = router;

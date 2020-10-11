const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const https = require('https');
const http = require('http');
const { response } = require('express');
const { json } = require('body-parser');
const request = require('request');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// ======== Routes ========
app.get('/', function (req, res) {
  res.render('index')
});

app.get('/search', function (req, res) {
  res.render('search')
});

app.post('/search/result', function (req, res) {
  const APIKEY = process.env.APIKEY;
  const movie = req.body.movie;
  const type = req.body.type;
  request('https://www.omdbapi.com/?s=' + movie + '&type=' + type + '&page=1&apikey=' + APIKEY, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var result = (JSON.parse(body)['Search']);
      var response = (JSON.parse(body));
      // console.log(response);
      res.render('show', { result: result, response: response });
    }
  })
});

app.post('/search/title', function (req, res) {
  const APIKEY = process.env.APIKEY;
  const title = req.body.title;
  request('https://www.omdbapi.com/?t=' + title + '&page=1&apikey=' + APIKEY, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var tResult = (JSON.parse(body));
      var tResponse = (JSON.parse(body));
      // console.log(result);
      res.render('titleShow', { tResult: tResult, tResponse: tResponse });
    }
  })
});

app.get('*', function (req, res) {
  res.redirect('/')
})

// ======== Listen on port =======
const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('Server on port ' + port)
  // console.log(process.env.APIKEY)
})  
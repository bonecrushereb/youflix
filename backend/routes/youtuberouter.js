const Router = require('express').Router;
const Youtube = require(__dirname + '/../models/youtube.js');
const superAgent = require('superagent');
const bodyParser = require('body-parser').json();
var youtubeRouter = module.exports = exports = Router();

youtubeRouter.post('/categories', bodyParser, (req, res) => {
  var newYoutubeSearch = new Youtube(req.body);
  newYoutubeSearch.save((err, data) => {
    if (err) return console.log(err);
    res.status(200).json(data);
  });
});

youtubeRouter.get('/categories', (req, res) => {
  Youtube.findOne( null, (err, data) => {
    if (err) console.log(err);
    // res.status(200).json(data);
    var address = 'https://www.googleapis.com/youtube/v3/search';
    superAgent
    .get(address)
    .query({ part: 'snippet',
            maxResults: 25,
            q: '' + data.keyword,
            key: process.env.YOUTUBE_API_KEY
    })
    .timeout(1000)
    .end((err, data) => {
      if (err) console.log(err);
      res.status(200).json(data);
    });
  });
});

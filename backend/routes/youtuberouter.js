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

youtubeRouter.get('/categories/:category', (req, res) => {
  let pageToken = {};
  Youtube.findOne({ keyword: req.params.category }, (err) => {
    if (err) console.log(err);
    var address = 'https://www.googleapis.com/youtube/v3/search';
    superAgent
    .get(address)
    .query({ part: 'snippet',
            maxResults: 2,
            q: req.params.category,
            key: process.env.YOUTUBE_API_KEY,
            pageToken: pageToken.current
    })
    .timeout(1000)
    .end((err, data) => {
      if (err) console.log(err);
      let currentData = JSON.parse(data.text);
      res.status(200).json(currentData);
    });
  });
});


youtubeRouter.put('/categories/:id', bodyParser, (req, res) => {
  var youtubeData = req.body;
  delete youtubeData._id;
  Youtube.update({ _id: req.params.id }, youtubeData, (err) => {
    if (err) console.log(err);

    res.status(200).json({ msg: 'keyword has been changed' });
  });
});

youtubeRouter.delete('/categories/:id', (req, res) => {
  Youtube.remove({ _id: req.params.id }, (err) => {
    if (err) console.log(err);

    res.status(200).json({ msg: 'category deleted' });
  });
});

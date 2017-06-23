const Router = require('express').Router;
const youtube = require(__dirname + '/../models/youtube.js')
const superAgent = require('superagent');
const bodyParser = require('body-parser').json();
var youtubeRouter = module.exports = exports = Router();

youtubeRouter.post('/api/categories', (req, res) => {

  console.log("hello from post");

  // var searchAddress = 'https://www.googleapis.com/youtube/v3/search';
  //
  // superAgent
  //   .get(searchAddress)
  //   .send({ q: '' + keyword })
  //   .set('key', process.env.YOUTUBE_API_KEY)
  //   .set('Accept', 'application/json')
  //   .end((err, data) => {
  //     if (err) return console.log(err);
  //     res.status(200).json(data);
  //   });
});

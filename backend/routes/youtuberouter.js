const Router = require('express').Router;
const Youtube = require(__dirname + '/../models/youtube.js')
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

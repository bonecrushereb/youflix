const Router = require('express').Router;
const superAgent = require('superagent');
var youtubeRouter = module.exports = exports = Router();

youtubeRouter.post('/api/categories', (req, res) => {

  var searchAddress = 'https://www.googleapis.com/youtube/v3/search';

  superAgent
    .get(searchAddress)
    .send({ q: '' + keyword })
    .set('Accept', 'application/json')
    .end((err, data) => {
      if (err) return console.log(err);
      res.status(200).json(data);
    });
});

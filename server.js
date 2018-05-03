const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const youtubeRouter = require(__dirname + '/backend/routes/youtuberouter');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOD_URI || 'mongodb://localhost/youtube_db');

app.use('/api', youtubeRouter);

app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.use(express.static(__dirname + '/public'))
  .get('*', (req, res) => {
    res.redirect('/public/bundle.js');
  });

module.exports = exports = app.listen(PORT, () => console.log('server up on port: ', PORT));

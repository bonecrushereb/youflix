const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOD_URI || 'mongodb://localhost/youtube_db');

app.use((req, res) => {
  res.status(404).send('Page not found');
});

module.exports = exports = app.listen(PORT, () => console.log('server up on port: ', PORT));

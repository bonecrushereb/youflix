const mongoose = require('mongoose');

var youtubeSchema = new mongoose.Schema({
  keyword: { type: String, required: true },
  title: { type: String },
  description: { type: String },
  videoId: { type: String },
  channelTitle: { type: String },
  like: { type: String }
});

module.exports = exports = mongoose.model('youtube', youtubeSchema);

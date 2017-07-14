const mongoose = require('mongoose');

var youtubeSchema = new mongoose.Schema({
  keyword: { type: String, required: true }
});

module.exports = exports = mongoose.model('youtube', youtubeSchema);

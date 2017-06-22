const mongoose = require('mongoose');

var searchSchema = new mongoose.Schema({
  keyword: { type: String, required: true },
  title: { type: String },
  description: { type: String },
  videoId: { type: String },
  channelTitle: { type: String }
});

module.exports = exports = mongoose.model('searchtube', searchSchema);

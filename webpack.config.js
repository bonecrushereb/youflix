var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: __dirname + '/app/entry.jsx',
  output: {
    path: path.resolve(__dirname + 'build'),
    filename: 'app.build.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};

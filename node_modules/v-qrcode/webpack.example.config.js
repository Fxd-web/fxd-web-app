var webpack = require('webpack');

var config = require('./webpack.config.js');

config.entry = {
    'example': './example/index.js'
};

config.devtool = null;

module.exports = config;

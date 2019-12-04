var webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './build',
    port: 6969,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({
        'IMG_URL': JSON.stringify('/img/'),
        'API_URL': JSON.stringify('http://localhost:9000/')
    })
  ],
});
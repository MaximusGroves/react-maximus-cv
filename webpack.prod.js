var webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new webpack.DefinePlugin({
        'IMG_URL': JSON.stringify('https://res.cloudinary.com/maximus/image/upload/remote_maximus/'),
        'API_URL': JSON.stringify('/.netlify/functions/')
    })
  ],
});
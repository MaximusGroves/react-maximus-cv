const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');
const projectRoot = path.resolve(__dirname, '../');
const resolve = dir => path.join(__dirname, dir);

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: { path: path.resolve(__dirname, 'build'), publicPath: '/',
    filename: 'bundle.js' },
  devServer: {
    contentBase: './build',
    port: 6969,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: projectRoot,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.json$/,
        loader: 'file-loader',
        type: 'javascript/auto'
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 7000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(pdf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 7000,
          name: 'data/[name].[ext]'
        }
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
		  {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
			  limit: 10000,
			  name: 'fonts/[name].[hash:7].[ext]'
        }
		  }


    ] },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['node_modules', resolve('src'), resolve('src/app/')],
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./index.html')
    }),
    new CopyWebpackPlugin([

      { from: 'src/assets/images', to: 'img' },
      { from: 'src/assets/data', to: 'data' },
      { from: 'src/assets/animations', to: 'animations' },
    ])
  ]
};


const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {  
	entry: './src/index.js',  
	output: {    path: path.resolve(__dirname, 'build'),    publicPath: '/',
	filename: 'bundle.js'  },
	devServer: {
		contentBase: './build',
		port: 6969,
		},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,     
				exclude: /node_modules/,      
				use: [
					'babel-loader', 
					//'eslint-loader'
				]    
			},
			{    
				test: /\.less$/,
				use: [ 'style-loader', 'css-loader',      'less-loader',],
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
		  },


		]  },
	devtool: 'inline-source-map',
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve('./index.html'),
		}),
    new CopyWebpackPlugin([

      { from: 'src/assets/images', to: 'img'},
      { from: 'src/assets/data', to: 'data'},

    ])
	],
};


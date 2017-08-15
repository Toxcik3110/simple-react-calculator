var path = require('path');
var webpack = require('webpack')

const env = process.env.NODE_ENV

const ExtractTextPlugin = require('extract-text-webpack-plugin')


module.exports = {
	entry: [
		'script-loader!jquery',
		'script-loader!foundation-sites/dist/js/foundation.min.js',
		'./app/app.jsx'
	],
	externals: {
		jquery: 'jQuery',
	},
	plugins: [
		new webpack.ProvidePlugin({
			'$': 'jquery',
			'jQuery': 'jquery',
		}),
	],
	output: {
		path: __dirname,
		filename: './public/bundle.js',
	},
	resolve: {
		modules: [
			path.resolve(__dirname, 'node_modules'),
			path.resolve(__dirname,'app/components/'),
			path.resolve(__dirname,'app/actions/'),
			path.resolve(__dirname,'app/reducers/'),
			path.resolve(__dirname,'app/store/'),
			path.resolve(__dirname,'app/api/')
		],
		alias: {
			applicationStyles: path.resolve(__dirname, 'app/styles/app.scss'),
		},
		extensions: [
			'.js',
			'.jsx'
		],
	},
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				query: {
					presets: [
						'react',
						'es2015',
						'stage-0'
					],
				},
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
			},
			// {
			// 	test: /\.css$/,
			// 	use: env === 'production'
			// 	? ExtractTextPlugin.extract({
			// 		fallback: 'style-loader',
			// 		use: [ 'css-loader' ]
			// 	})
			// 	: [ 'style-loader', 'css-loader' ]
			// },
			// {
			// 	test: /\.scss$/,
			// 	include: path.join(__dirname, 'scss'),
			// 	loaders: ["style", "css?sourceMap", "sass?sourceMap"]
			// },
			{
				loader: 'url-loader',
				test: /\.(png|jpg)$/,
				// options: {
				// 	limit: 10
				// },
			}
		],
	},
};
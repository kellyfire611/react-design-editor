const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const pkg = require('./package.json');

module.exports = {
	mode: 'production',
	entry: {
		[pkg.name]: path.resolve(__dirname, 'src/index.tsx'),
		[`${pkg.name}.min`]: path.resolve(__dirname, 'src/index.tsx'),
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		library: `${pkg.name}.js`,
		libraryTarget: 'umd',
		umdNamedDefine: true,
		publicPath: './',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|tsx|ts)$/,
				loader: 'babel-loader?cacheDirectory',
				include: path.resolve(__dirname, 'src'),
				options: {
					presets: [
						[
							'@babel/preset-env',
							{
								targets: {
									browsers: ['last 2 versions', 'ie >= 11'],
								},
							},
						],
						'@babel/preset-react',
						'@babel/preset-typescript',
					],
					plugins: [
						[
							'@babel/plugin-transform-runtime',
							{
								corejs: 3,
								shippedProposals: true,
							},
						],
						'@babel/plugin-proposal-async-generator-functions',
						'@babel/plugin-proposal-class-properties',
						'@babel/plugin-proposal-object-rest-spread',
					],
				},
				exclude: /node_modules/,
			},
			{
				test: /\.(css|less)$/,
				use: ['style-loader', 'css-loader', 'less-loader'],
			},
			{
				test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader',
				options: {
					publicPath: './',
					name: 'fonts/[hash].[ext]',
					limit: 10000,
				},
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', 'jsx'],
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				include: /\.min\.js$/,
				cache: true,
				parallel: true,
				terserOptions: {
					warnings: false,
					compress: {
						warnings: false,
						unused: true,
					},
					ecma: 6,
					mangle: true,
					unused: true,
				},
				sourceMap: true,
			}),
		],
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			minimize: true,
		}),
	],
};

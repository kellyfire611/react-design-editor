const path = require('path');

module.exports = {
	module: {
		rules: [
			{
				test: /\.(js|jsx|tsx|ts)$/,
				loader: 'babel-loader?cacheDirectory',
				include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, '../src')],
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
						'react-hot-loader/babel',
						['import', { libraryName: 'antd', style: true }],
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
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /node_modules/,
					chunks: 'initial',
					name: 'vendor',
					enforce: true,
				},
			},
		},
		noEmitOnErrors: true,
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', 'jsx'],
		alias: {
			'@react-design-editor': path.resolve(__dirname, '../src/index.tsx'),
		},
	},
	node: {
		net: 'empty',
		fs: 'empty',
		tls: 'empty',
	},
};

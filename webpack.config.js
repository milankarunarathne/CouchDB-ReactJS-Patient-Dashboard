module.exports = {
	entry: "./app/app.js",
	output: {
		path: "./public",
		filename: "bundle.js"
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /(node_modules|bower_components|lib|server|index.js)/,
			loader: 'babel-loader'
		}]
	}
};

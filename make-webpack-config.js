/*
 * Webpack server configuration
 *
 * For dev, config is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 *
 * For production, config is set up for serving the distribution version. It will be compiled to dist/ by default
 */


const webpack = require("webpack");
const path = require("path");

/**
 * http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
 */
function escapeRegExp(str) {
	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function buildConfig(options) {
	const dev = options.dev;

	// Include js-common as source path to be process by babel loader (jsx and ES6 support)
	const currentSrc = escapeRegExp(path.join(__dirname, "src"));

	// Entry
	let entry;
	if (!dev) {
		entry = "./src/script/tooltip.jsx";
	} else {
		console.log("is dev");
		entry = ["webpack/hot/only-dev-server", "./src/script/example-tooltip.jsx"];
	}

	// Output
	const output = {
		publicPath: "/assets/",
		filename: "tooltip.bundle.js"
	};
	if (!dev) {
		output.path = "dist/assets/";
	}

	// Plugins
	let plugins;
	if (!dev) {
		plugins = [
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin(),
			new webpack.optimize.OccurenceOrderPlugin(),
			new webpack.optimize.AggressiveMergingPlugin()
		];
	} else {
		plugins = [new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin()];
	}

	// js/jsx loader
	const jsLoader = {
		test: /\.js$/,
		include: currentSrc
	};
	if (!dev) {
		jsLoader.loader = "babel-loader";
	} else {
		jsLoader.loaders = ["react-hot-loader", "babel-loader"];
	}

	const config = {
		cache: dev,
		debug: dev,

		entry: entry,
		output: output,

		stats: {
			colors: true,
			reasons: dev
		},

		resolve: {
			extensions: ["", ".js"]
		},

		module: {
			preLoaders: [
				{
					test: /\.(js|jsx)$/,
					include: currentSrc,
					loader: "eslint"
				}
			],
			loaders: [
				{ test: /\.css$/, loader: "style-loader!css-loader" },
				{ test: /\.(jpe?g|png|gif)$/, loader: "url-loader?limit=10000" },
				{ test: /\.jsx$/, exclude: /node_modules/, loaders: dev ? ["react-hot-loader", "babel-loader"] : ["babel-loader"] }
			]
		},

		plugins: plugins,

		headers: {
			"Access-Control-Allow-Origin": "*"
		}
	};

	// Add sourceMap for dev
	if (dev) {
		config.devtool = "source-map";
	}

	return config;
}

module.exports = function(options) {
	console.log(buildConfig(options));
	return buildConfig(options);
};

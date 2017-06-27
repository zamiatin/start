var path = require('path');
var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: {
    home: "./home",
    about: "./about"
  },

  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].js",
    library: "[name]"
  },

  watch: NODE_ENV == 'development',

  watchOptions: {
    aggregateTimeout: 100
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ]
  },

  devtool: NODE_ENV == 'development' ? "cheap-iline-module-source-map" : false,

  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    })
  ]

};

if (NODE_ENV == 'production') {
  module.exports.plugins.push(
    new UglifyJSPlugin({
      compress: true,
    })
  );
}
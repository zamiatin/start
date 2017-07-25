var path = require('path');
var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: "./home",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "main.js",
  },

  watch: NODE_ENV == 'development',

  watchOptions: {
    aggregateTimeout: 300
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src', 'style'),
        use: ExtractTextPlugin.extract ({
          fallback: 'style-loader',
          use: ['css-loader?sourceMap', 'sass-loader'],
        })
      },
      {
        test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'file-loader?name=[hash].[ext]&publicPath=/public/',
      },
    ]
  },

  devtool: NODE_ENV == 'development' ? 'inline-source-map' : false,

  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new ExtractTextPlugin('main.css'),
    new webpack.NoEmitOnErrorsPlugin(),
  ]

};

if (NODE_ENV == 'production') {
  module.exports.plugins.push(
    new UglifyJSPlugin({
      compress: true,
    })
  );
}
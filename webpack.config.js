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
    publicPath: process.env.PUBLIC_PATH,
    filename: "main.js",
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
          // fallback: 'style-loader',
          use: ['css-loader?sourceMap', 'sass-loader'],
        })
      },
      {
        test: /\.ttf$/,
        include: path.resolve(__dirname, 'src', 'fonts'),
        loader: 'file-loader?name=[hash].[ext]'
      },
      {
        test: /\.(png|jpg|svg)$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'url-loader?limit=1000000',
      }
    ]
  },

  devtool: NODE_ENV == 'development' ? 'inline-source-map' : false,

  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new ExtractTextPlugin('main.css'),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    hot: true,
    port: 5000,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }
};

if (NODE_ENV == 'production') {
  module.exports.plugins.push(
    new UglifyJSPlugin({
      compress: true,
    })
  );
}
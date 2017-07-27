"use strict";

const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server/lib/Server");
const webpackConfig = require("./webpack.config");
const path = require('path');

const port = 5000;
const compiler = Webpack(webpackConfig);
const server = new WebpackDevServer(compiler, {
  hot: true,
  contentBase: path.resolve(__dirname, 'public'),
  stats: {
    colors: true
  },
});

server.listen(port, "127.0.0.1", function() {
  console.log(`Starting server on http://localhost:${port}`);
});
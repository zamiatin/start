"use strict";

const http = require('http');
const express = require('express');
const app = express();

(function initWebpack() {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config');
  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000,
  }));

  app.use(express.static(__dirname + '/'));
})();

app.get(/.*/, function root(req, res) {
  res.sendFile(__dirname + '/index.html');
});

const server = http.createServer(app);
server.listen(process.env.PORT || 5000, function onListen() {
  const address = server.address();
  console.log('Listening on: http://localhost:%d', address.port);
});


// const Webpack = require("webpack");
// const WebpackDevServer = require("webpack-dev-server/lib/Server");
// const webpackConfig = require("./webpack.config");
// const path = require('path');

// const port = 5000;
// const compiler = Webpack(webpackConfig);
// const server = new WebpackDevServer(compiler, {
//   hot: true,
//   // contentBase: path.resolve(__dirname, 'public'),
//   stats: {
//     hot: true,
//     port: 5000,
//     stats: {
//       colors: true,
//       hash: false,
//       timings: true,
//       chunks: false,
//       chunkModules: false,
//       modules: false
//     }
//   },
// });

// server.listen(port, "127.0.0.1", function() {
//   console.log(`Starting server on http://localhost:${port}`);
// });
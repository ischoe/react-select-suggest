import webpack from 'webpack';
import webpackConfig from '../webpack.config.dev.js';

/*eslint-disable no-console*/
var WebpackDevServer = require('webpack-dev-server');

new WebpackDevServer(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(3000, 'localhost', function (err) {
  if (err) {
    return console.log('Error : ', err);
  }
  console.log('Listening at http://localhost:3000/');
});
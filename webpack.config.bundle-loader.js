const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.bundle-loader.js',
  },
  module: {
    rules: [
      {
        test: /screens\/.*\.js$/,
        loader: 'bundle-loader',
        options: {
          lazy: true,
          name: '[name]',
        },
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Code Splitting | Bundle loader'
    }),
    new (require('webpack')).optimize.CommonsChunkPlugin({
      name: 'common',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/use-bundle-loader')
  }
};
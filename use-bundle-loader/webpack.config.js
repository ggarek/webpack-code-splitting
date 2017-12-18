const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /screens\/.*\.js$/,
        loader: 'bundle-loader',
        options: {
          lazy: true,
          name: '[name].screen',
        },
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Code Splitting | Bundle loader'
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
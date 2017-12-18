const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.dynamic-import.js',
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Code Splitting | Dynamic import'
    }),
      // new (require('webpack')).optimize.CommonsChunkPlugin({
      //   name: 'common' // Specify the common bundle's name.
      // })
  ],
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/use-dynamic-import')
  }
};
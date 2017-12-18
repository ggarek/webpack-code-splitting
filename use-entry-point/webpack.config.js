const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    inventory: './src/screens/inventory.js',
    skills: './src/screens/skills.js',
    character: './src/screens/character.js',
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Code Splitting | Manual entry points'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
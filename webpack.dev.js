/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const commonConfig = require('./webpack.common');

const config = merge(commonConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    overlay: {
      error: true,
      warning: true,
    },
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/game.html',
      filename: 'game.html',
      excludeChunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      excludeChunks: ['game'],
    }),
    new ErrorOverlayPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
});

module.exports = config;

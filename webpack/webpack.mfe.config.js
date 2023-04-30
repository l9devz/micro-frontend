const config = require('./webpack.config')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const DotEnv = require('dotenv-webpack')
const { v4: uuidv4 } = require('uuid')

module.exports.config = {
  ...config,

  entry: {},

  mode: 'development',

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, Content-Type, Authorization',
      'X-Content-Type-Options': 'nosniff',
    },
  },

  output: {
    ...config.output,
    publicPath: 'auto',
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: `${uuidv4()}.[contenthash].css`,
      chunkFilename: `${uuidv4()}.[contenthash].css`,
    }),
    new DotEnv({
      path: '../../.env',
      safe: true,
    }),
  ],

  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false, // do not extract comments to the *.LICENSE.txt file
      }),
    ],
  },
}

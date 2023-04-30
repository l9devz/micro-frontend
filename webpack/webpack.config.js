const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { v4: uuidv4 } = require('uuid')

module.exports = {
  devtool: 'inline-source-map',
  entry: [path.resolve(__dirname, 'src/index.tsx')],
  output: {
    filename: `${uuidv4()}.[contenthash].js`,
    path: path.resolve('dist'),
    chunkFilename: `${uuidv4()}.[contenthash].js`,
    publicPath: '/',
    crossOriginLoading: 'anonymous',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              reportFiles: ['src/*.{ts,tsx}', 'src/**/*.{ts,tsx}'],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(css)$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        loader: 'file-loader',
        test: /\.jpe?g$|\.png$|\.gif$|\.svg$|\.webp$|\.ico$|\.mp3$/,
        options: {
          name: `${uuidv4()}.[contenthash].[ext]`,
        },
      },
      {
        loader: 'file-loader',
        test: /\.woff$|\.woff2$|\.eot$|\.ttf$|\.wav$/,
        options: {
          name: `${uuidv4()}.[contenthash].[ext]`,
        },
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
}

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { config } = require('../../webpack/webpack.mfe.config')
const { dependencies } = require('./package.json')
const { ModuleFederationPlugin } = require('webpack').container
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  ...config,

  entry: {
    index: './src/index.tsx',
  },

  devServer: {
    ...config.devServer,
    port: 8081,
    open: true,
  },

  plugins: [
    ...config.plugins,
    new ModuleFederationPlugin({
      name: 'app',
      remotes: {
        example: 'example@http://localhost:8082/exampleRemoteEntry.js',
      },
      shared: {
        ...dependencies,
        react: {
          eager: true,
          singleton: true,
          requiredVersion: dependencies.react,
        },
        'react-dom': {
          eager: true,
          singleton: true,
          requiredVersion: dependencies['react-dom'],
        },
        'react-router-dom': {
          eager: true,
          singleton: true,
          requiredVersion: dependencies['react-router-dom'],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        isDev: process.env.NODE_ENV === 'development',
      },
    }),
  ],
  resolve: {
    ...config.resolve,
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
  }
}

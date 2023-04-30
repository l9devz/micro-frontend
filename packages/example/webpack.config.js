const { ModuleFederationPlugin } = require('webpack').container
const { config } = require('../../webpack/webpack.mfe.config')
const { dependencies } = require('./package.json')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  ...config,
  entry: {
    index: './src/index.tsx',
  },

  devServer: {
    ...config.devServer,
    port: 8082,
  },

  plugins: [
    ...config.plugins,
    new ModuleFederationPlugin({
      name: 'example',
      filename: 'exampleRemoteEntry.js',
      exposes: {
        './Example': './src/Example.tsx',
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
    }),
  ],
  resolve: {
    ...config.resolve,
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
  }
}

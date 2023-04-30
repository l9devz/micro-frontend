const HtmlWebpackPlugin = require('html-webpack-plugin')
const { config } = require('../../webpack/webpack.mfe.prod')
const { dependencies } = require('./package.json')
const { ModuleFederationPlugin } = require('webpack').container
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  ...config,

  entry: {
    index: './src/index.tsx',
  },

  plugins: [
    ...config.plugins,
    new ModuleFederationPlugin({
      name: 'app',
      library: { type: 'var', name: 'app' },
      remotes: {
        example: 'example',
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

const { ModuleFederationPlugin } = require('webpack').container
const { config } = require('../../webpack/webpack.mfe.prod')
const { dependencies } = require('./package.json')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  ...config,
  entry: {
    index: './src/index.tsx',
  },
  plugins: [
    ...config.plugins,
    new ModuleFederationPlugin({
      name: 'example',
      library: { type: 'var', name: 'example' },
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
  ],
  resolve: {
    ...config.resolve,
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
  }
}

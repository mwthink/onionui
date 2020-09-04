import { Configuration } from 'webpack';
import * as Path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

const config: Configuration = {
  mode: process.env['NODE_ENV'] as any || 'development',
  entry: Path.resolve(__dirname, 'src/browser.tsx'),
  output: {
    path: Path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts','.tsx','.js'],
    modules: ['node_modules']
  },
  module: {
    rules: [
      {test: /\.tsx?$/, loader: 'ts-loader'},
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'OnionUI',
      hash: true,
      template: Path.resolve(__dirname,'src/tpl.html')
    })
  ],
  devServer: {
    contentBase: false,
    port: 3000,
    historyApiFallback: true,
    proxy: {}
  }
};

export default config;

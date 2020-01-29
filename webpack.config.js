// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const pathToPhaser = path.join(__dirname, '/node_modules/phaser/');
const phaser = path.join(pathToPhaser, 'dist/phaser.js');

module.exports = {
  entry: './game.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader', 'eslint-loader'],
        exclude: '/node_modules/',
      },
      { test: /phaser\.js$/, loader: 'expose-loader?Phaser' },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, './'),
    publicPath: '/dist/',
    host: '127.0.0.1',
    port: 8080,
    open: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      phaser: phaser,
    },
  },
};

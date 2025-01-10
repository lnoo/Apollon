const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const outputDir = path.resolve(__dirname, '../dist');

module.exports = {
  entry: './src/main/index.ts',
  output: {
    path: outputDir,
    filename: 'apollon.js',
    clean: true,
    library: { type: 'module' },
  },
  experiments: {
    outputModule: true,
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        exclude: /\/node_modules\//,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              experimentalWatchApi: true,
              compilerOptions: {
                declaration: false,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new CircularDependencyPlugin({ exclude: /node_modules/ })],
};

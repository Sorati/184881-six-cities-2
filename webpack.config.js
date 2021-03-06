const path = require(`path`);
const webpack = require(`webpack`);

module.exports = {
  entry: `./src/index.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    compress: false,
    open: true,
    port: 1337,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      }
    ],
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, `src/components/`)
    },
    modules: [
      `node_modules`,
      path.resolve(path.join(__dirname, `public`))
    ],
    extensions: [`.js`, `.jsx`, `.ts`, `.tsx`, `.webm`]
  },
  devtool: `source-map`,
  plugins: [
    new webpack.ProvidePlugin({
      React: `react`,
      PropTypes: `prop-types`,
    }),
  ]
};

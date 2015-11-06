var path    = require('path');
var webpack = require('webpack');

var nodePath = __dirname + path.sep + "node_modules";

function resolveRelative(relativePath) {
    if (process.env.NODE_PATH) {
        return path.resolve(process.env.NODE_PATH, "..", relativePath);
    } else {
        return path.resolve(__dirname, relativePath);
    }
}

module.exports = {
  devtool: 'eval',

  entry: [
        'webpack-dev-server/client?http://localhost:3000', // WebpackDevServer host and port
        'webpack/hot/only-dev-server',
        resolveRelative('packages/<%= appname %>/dist/index')
  ],

  output: {
    path: resolveRelative("dist"),
    filename: '<%= appname %>.js',
    publicPath: "http://localhost:3000/",
    library: "<%= appname %>"
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  resolve: {
    extensions: ['', '.js', '.css'],
    root: nodePath
  },
  
  resolveLoader: {
     root: nodePath
  },
  
  module: {
    loaders: [
    {
      test: /\.css$/, 
      loader: "style!css?localIdentName=[path][name]---[local]---[hash:base64:5]"
    },
    {
      test: /\.js(x?)$/,
      include: [ resolveRelative('packages') ],
      loaders: [ 'react-hot']
    }]
  }
};

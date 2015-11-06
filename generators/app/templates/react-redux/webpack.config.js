var path    = require('path');
var webpack = require('webpack');

var nodePath = process.env.NODE_PATH ? process.env.NODE_PATH.split(path.delimiter) : __dirname + path.sep + "node_modules";

function resolveRelative(relativePath) {
    if (process.env.NODE_PATH) {
        return path.resolve(process.env.NODE_PATH, "..", relativePath);
    } else {
        return path.resolve(__dirname, relativePath);
    }
}

module.exports = {
  entry: [
        resolveRelative('packages/owa-application/dist/index')
  ],

  output: {
    filename: 'owa.client.next.js',
    library: "OwaNext"
  },

  resolve: {
    extensions: ['', '.js', '.css'],
    root: nodePath
  },
  
  resolveLoader: {
     root: nodePath
  },
  
  module: {
    loaders: [{
      test: /\.css$/, 
      loader: "style!css"
    }]
  }
};

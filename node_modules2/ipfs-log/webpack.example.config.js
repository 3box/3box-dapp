'use strict'

const Uglify = require('uglifyjs-webpack-plugin')
const path = require('path')

const uglifyOptions = {
  uglifyOptions: {
    mangle: false,
  },
}

module.exports = {
  entry: './examples/browser/index.js',
  output: {
    filename: './examples/browser/bundle.js'
  },
  target: 'web',
  node: {
    console: false,
    process: 'mock',
    Buffer: true
  },
  plugins: [
    new Uglify(uglifyOptions),
  ],
  externals: {
    fs: '{}',
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '../node_modules')
    ],
    alias: {
      // These are needed because node-libs-browser depends on outdated
      // versions
      //
      // Can be dropped once https://github.com/devongovett/browserify-zlib/pull/18
      // is shipped
      zlib: 'browserify-zlib',
      // Can be dropped once https://github.com/webpack/node-libs-browser/pull/41
      // is shipped
      http: 'stream-http',
    }
  },
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '../node_modules')
    ],
    moduleExtensions: ['-loader']
  },
  module: {
    rules: [{
      test: /\.json$/,
      loader: 'json-loader'
    }]
  }
}

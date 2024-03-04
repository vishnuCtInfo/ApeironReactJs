const Buffer = require('buffer').Buffer;
const process = require('process');
const stream = require('stream');

module.exports = function override(config, env) {
  // Add the necessary polyfills for React 18
  config.resolve.alias = {
    ...config.resolve.alias,
    buffer: 'buffer',
    crypto: 'crypto-browserify',
    process: 'process/browser',
    stream: 'stream-browserify',
  };

  return config;
};

var path = require('path'),
    env  = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    base = path.resolve(__dirname, '../');

try {
  module.exports = exports = require('./config/' + env)(base);
} catch (e) {
  console.log([
    '\n** Server Config Error **',
    '\nCould not find a valid configuration file for your active',
    'node environment: "%s". If this is your first time using this',
    'project, make sure to create any non-development config files',
    'in /server/config/<environment>.js',
    '\n'
  ].join(' '), env);
}
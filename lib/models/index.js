'use strict';

// var mongoose = require('mongoose');
var schemas = require('./schemas');
var core = require('ournet.core');
var Promise = core.Promise;
var models = ['Website', 'Feed', 'IntWebsite'];

//mongoose.set('debug', true);

module.exports = function(connection) {
  var db = {};
  models.forEach(function(model) {
    var m = db[model] = connection.model(model, schemas[model]);
    Promise.promisifyAll(m);
    Promise.promisifyAll(m.prototype);
  });

  return db;
};

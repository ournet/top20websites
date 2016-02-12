'use strict';

// var mongoose = require('mongoose');
var schemas = require('./schemas');
var utils = require('../utils');
var Promise = utils.Promise;
var models = ['Website', 'Feed'];

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

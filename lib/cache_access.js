'use strict';

var utils = require('./utils');
var Promise = utils.Promise;
var cache = require('memory-cache');
var util = require('util');
var AccessService = require('./access');

function get(self, name, params, options) {
	var key = 'websites_' + name + (params && ('-' + JSON.stringify(params)) || '');

	var result = cache.get(key);

	if ([null, undefined].indexOf(result) < 0) {
		//console.log('from cache', key);
		return Promise.resolve(result);
	}

	options = options || {
		cache: 60
	};

	return AccessService.prototype[name].call(self, params)
		.then(function(data) {
			if (data) {
				if (options.cache) {
					cache.put(key, data, options.cache * 1000);
				}
			}
			return data;
		});
}

var Service = module.exports = function Service() {
	AccessService.apply(this, arguments);
};

util.inherits(Service, AccessService);

Service.prototype.contentTypesStat = function(params) {
	return get(this, 'contentTypesStat', params);
};

Service.prototype.categoriesStat = function(params) {
	return get(this, 'categoriesStat', params);
};

Service.prototype.subCategoriesStat = function(params) {
	return get(this, 'subCategoriesStat', params);
};

Service.prototype.websites = function(params, options) {
	return get(this, 'websites', params, options);
};

Service.prototype.websitesCount = function(params, options) {
	return get(this, 'websitesCount', params, options);
};

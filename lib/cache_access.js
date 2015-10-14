'use strict';

var core = require('ournet.core');
var Promise = core.Promise;
var cache = new core.MemoryCache({
	ttl: 60 * 15
});
var util = require('util');
var AccessService = require('./access');

function get(self, name, params, options) {
	var key = name + (params && ('-' + JSON.stringify(params)) || '');

	var result = cache.get(key);

	if (core.util.isNotNull(result)) {
		//console.log('from cache', key);
		return Promise.resolve(result);
	}

	return AccessService.prototype[name].call(self, params).then(function(data) {
		if (data) {
			if (!options || options.cache !== false) {
				cache.set(key, data, options);
			}
		}
		return data;
	});
}

var Service = module.exports = function Service() {
	AccessService.apply(this, arguments);
};

util.inherits(Service, AccessService);

Service.prototype.intCountries = function() {
	return get(this, 'intCountries', null, 60 * 30);
};

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

Service.prototype.intWebsites = function(params, options) {
	return get(this, 'intWebsites', params, options);
};

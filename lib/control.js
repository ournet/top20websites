'use strict';

var core = require('ournet.core');
var utils = require('./utils');
var get = utils.mongoGet;
var Promise = core.Promise;
var Counter = require('ournet.data').counter;

var Service = module.exports = function Service(db) {
	this.db = db;
};

Service.prototype.createWebsite = function(data) {
	return this.create('Website', 'web-website', data);
};

Service.prototype.createFeed = function(data) {
	return this.create('Feed', 'web-feed', data);
};

Service.prototype.updateFeed = function(data) {
	return this.update('Feed', data.id || data._id, data);
};

Service.prototype.insertWebsite = function(data) {
	var self = this;
	return this.db.Website.removeAsync({
		_id: data.id
	}).then(function() {
		return self.insert('Website', data);
	});
};

Service.prototype.insertIntWebsite = function(data) {
	var self = this;
	return this.db.IntWebsite.removeAsync({
		_id: data.id
	}).then(function() {
		return self.insert('IntWebsite', data);
	});
};

Service.prototype.insertFeed = function(data) {
	var self = this;
	data.urlHash = core.util.md5(data.url);
	return this.db.Feed.removeAsync({
		_id: data.id
	}).then(function() {
		return self.insert('Feed', data);
	});
};

Service.prototype.create = function(model, counter, data) {
	var self = this;

	return Counter.inc(counter).then(function(id) {
		data._id = id;
		return self.db[model].createAsync(data).then(get);
	});
};

Service.prototype.insert = function(model, data) {
	var self = this;
	data._id = data._id || data.id;
	delete data.id;
	return self.db[model].createAsync(data).then(get);
};

Service.prototype.update = function(model, id, data) {
	if (!id) {
		return Promise.reject(new Error('Id is reaquired'));
	}
	delete data.id;
	delete data._id;
	delete data.siteId;
	data.updatedAt = Date.now();
	return this.db[model].findByIdAndUpdateAsync(id, data).then(get);
};

'use strict';

var utils = require('./utils');
var get = utils.data.mongoGet;
var Promise = utils.Promise;
var Counter = require('statefulco').counter;
var normalize = require('./normalize');

var Service = module.exports = function Service(db) {
	this.db = db;
};

Service.prototype.createWebsite = function(data) {
	var self = this;
	try {
		data = normalize.website(data);
	} catch (e) {
		return Promise.reject(e);
	}
	return this.create('Website', 'web-website', data)
		.then(function(website) {
			return Promise.each(data.feeds || [], function(feed) {
					feed.websiteId = website.id;
					return self.createFeed(feed);
				})
				.then(function() {
					return website;
				}, function() {
					return website;
				});
		});
};

Service.prototype.updateWebsite = function(data) {
	try {
		data = normalize.websiteUpdate(data);
	} catch (e) {
		return Promise.reject(e);
	}
	return this.update('Website', data.id || data._id, data);
};

Service.prototype.createFeed = function(data) {
	try {
		data = normalize.feed(data);
	} catch (e) {
		return Promise.reject(e);
	}
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

Service.prototype.insertFeed = function(data) {
	var self = this;
	data.urlHash = utils.md5(data.url);
	return this.db.Feed.removeAsync({
		_id: data.id
	}).then(function() {
		return self.insert('Feed', data);
	});
};

Service.prototype.create = function(model, counter, data) {
	var self = this;

	return new Promise(function(resolve, reject) {
			return Counter.inc(counter, function(error, value) {
				if (error) {
					return reject(error);
				}
				resolve(value);
			});
		})
		.then(function(id) {
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

"use strict";

var utils = require("./utils");
var get = utils.data.mongoGet;
var Promise = utils.Promise;
var normalize = require("./normalize");

var Service = (module.exports = function Service(db) {
	this.db = db;
});

Service.prototype.createWebsite = function (data) {
	var self = this;
	try {
		data = normalize.website(data);
	} catch (e) {
		return Promise.reject(e);
	}
	return this.create("Website", "top20-website", data).then(function (website) {
		return Promise.each(data.feeds || [], function (feed) {
			feed.websiteId = website.id;
			return self.createFeed(feed);
		}).then(
			function () {
				return website;
			},
			function () {
				return website;
			}
		);
	});
};

Service.prototype.updateWebsite = function (data) {
	try {
		data = normalize.websiteUpdate(data);
	} catch (e) {
		return Promise.reject(e);
	}
	return this.update("Website", data.id || data._id, data);
};

Service.prototype.createFeed = function (data) {
	try {
		data = normalize.feed(data);
	} catch (e) {
		return Promise.reject(e);
	}
	return this.create("Feed", "top20-feed", data);
};

Service.prototype.updateFeed = function (data) {
	return this.update("Feed", data.id || data._id, data);
};

Service.prototype.insertWebsite = function (data) {
	var self = this;
	return this.db.Website.removeAsync({
		_id: data.id,
	}).then(function () {
		return self.insert("Website", data);
	});
};

Service.prototype.insertFeed = function (data) {
	var self = this;
	data.urlHash = utils.md5(data.url);
	return this.db.Feed.removeAsync({
		_id: data.id,
	}).then(function () {
		return self.insert("Feed", data);
	});
};

Service.prototype.create = function (model, data) {
	var self = this;

	return new Promise(function (resolve, reject) {
		return self.db[model]
			.find({})
			.select("_id")
			.sort({ _id: -1 })
			.limit(1)
			.exec(function (error, list) {
				if (error) {
					return reject(error);
				}
				list = get(list);
				var id = list[0] ? list[0]._id || list[0].id : 0;
				data._id = id + 1;
				return self.db[model]
					.createAsync(data)
					.then(get)
					.then(resolve)
					.catch(reject);
			});
	});
};

Service.prototype.insert = function (model, data) {
	var self = this;
	data._id = data._id || data.id;
	delete data.id;
	return self.db[model].createAsync(data).then(get);
};

Service.prototype.update = function (model, id, data) {
	if (!id) {
		return Promise.reject(new Error("Id is reaquired"));
	}
	delete data.id;
	delete data._id;
	delete data.siteId;
	data.updatedAt = Date.now();
	return this.db[model].findByIdAndUpdateAsync(id, data).then(get);
};

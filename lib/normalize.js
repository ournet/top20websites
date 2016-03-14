'use strict';

var utils = require('./utils');
var _ = utils._;
var url = require('url');

exports.website = function(data) {
	data = _.cloneDeep(data);

	data.host = data.host.trim().toLowerCase();

	data.title = data.title || data.host;
	data.description = data.description || data.title;
	data.keywords = data.keywords || data.description;

	if (!Array.isArray(data.keywords)) {
		if (typeof data.keywords === 'string') {
			data.keywords = data.keywords.split(/[\t\n\r;,|\[\]\/:\?!—]+/g)
				.map(function(w) {
					return w.trim().replace(/[._-]+$/, '').replace(/^[._-]+/, '').trim();
				})
				.filter(function(w) {
					return w.length > 2;
				});
		} else {
			data.keywords = [];
		}
	}

	if (data.feeds) {
		data.feeds.forEach(function(feed) {
			feed.lang = feed.lang || data.lang;
			feed.country = feed.country || data.country;
			feed.contentType = feed.contentType || data.contentType;
		});
	}

	if (data.title.length > 100) {
		data.title = data.title.substr(0, 100);
	}
	if (data.description.length > 500) {
		data.description = data.description.substr(0, 500);
	}

	return data;
};

exports.feed = function(data) {
	data = _.cloneDeep(data);

	data.url = data.url || data.href;

	if (data.title && data.title.length > 100) {
		data.title = data.title.substr(0, 100);
	}

	var href = url.parse(data.url);
	href = href.hostname.replace(/^www\./, '') + href.path;

	data.urlHash = utils.md5(href);

	return data;
};

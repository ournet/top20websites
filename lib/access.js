'use strict';

var core = require('ournet.core');
var assert = require('assert');
var utils = require('./utils');
var get = utils.mongoGet;
var Promise = core.Promise;
var _ = core._;
var ContentTypes = require('./content_types');
var Categories = require('./categories');

var Service = module.exports = function Service(db) {
	this.db = db;
};

Service.prototype.feeds = function(params) {
	assert.ok(params);

	return this.list('Feed', params);
};

Service.prototype.websites = function(params) {
	assert.ok(params);

	return this.list('Website', params);
};

Service.prototype.intWebsites = function(params) {
	assert.ok(params);

	return this.list('IntWebsite', params);
};

Service.prototype.websitesCount = function(params) {
	assert.ok(params);

	return this.count('Website', params);
};

Service.prototype.intWebsitesCount = function(params) {
	assert.ok(params);

	return this.count('IntWebsite', params);
};

Service.prototype.website = function(params) {
	assert.ok(params);

	if (params.id) {
		return this.websiteById(params);
	} else if (params.host) {
		return this.websiteByHost(params);
	}
	return Promise.reject(new Error('Invalid query'));
};

Service.prototype.intWebsite = function(params) {
	assert.ok(params);

	return this.one('IntWebsite', {
		_id: params.id || params._id
	});
};

Service.prototype.websiteById = function(params) {
	return this.one('Website', {
		_id: params.id
	});
};
Service.prototype.websiteByHost = function(params) {
	return this.one('Website', {
		host: params.host
	});
};

Service.prototype.intCountries = function() {
	return this.db.IntWebsite.aggregateAsync([{
		$group: {
			_id: '$country',
			count: {
				$sum: 1
			}
		}
	}]).then(function(stats) {
		return stats.map(function(item) {
			item.id = item._id;
			delete item._id;
			return item;
		});
	});
};

Service.prototype.contentTypesStat = function(params) {
	return this.db.Website.aggregateAsync([{
		$match: params.where
	}, {
		$group: {
			_id: '$contentType',
			count: {
				$sum: 1
			}
		}
	}]).then(function(stats) {
		var type;
		return stats.map(function(item) {
			type = _.clone(ContentTypes.type(item._id));
			if (!type) {
				return type;
			}
			type.count = item.count;
			return type;
		});
	});
};

Service.prototype.categoriesStat = function(params) {
	return this.db.Website.aggregateAsync([{
		$match: params.where
	}, {
		$project: {
			_id: 0,
			categories: 1
		}
	}, {
		$unwind: '$categories'
	}, {
		$match: {
			categories: /^c0/
		}
	}, {
		$group: {
			_id: '$categories',
			count: {
				$sum: 1
			}
		}
	}]).then(function(stats) {
		var type;
		return stats.map(function(item) {
			type = _.clone(Categories.category(parseInt(item._id.substr(3))));
			if (!type) {
				return type;
			}
			type.count = item.count;
			return type;
		});
	});
};

Service.prototype.subCategoriesStat = function(params) {
	return this.db.Website.aggregateAsync([{
		$match: params.where
	}, {
		$project: {
			_id: 0,
			categories: 1
		}
	}, {
		$unwind: '$categories'
	}, {
		$match: {
			categories: params.where.categories
		}
	}, {
		$group: {
			_id: '$categories',
			count: {
				$sum: 1
			}
		}
	}]).then(function(stats) {
		var type;
		return stats.map(function(item) {
			type = _.clone(Categories.subCategory(params.category, parseInt(item._id.substr(3))));
			if (!type) {
				return type;
			}
			type.count = item.count;
			return type;
		});
	});
};

Service.prototype.count = function(model, params) {
	return this.db[model].count(params);
};

Service.prototype.one = function(model, params) {
	return this.db[model].findOne(params).then(get);
};

Service.prototype.list = function(model, params) {
	var self = this,
		limit = 10;

	if (params.limit && (params.limit < 1 || params.limit > 200)) {
		delete params.limit;
	}

	//console.log('splited select: ', params.select);
	//params.order = params.order || ;
	var sort = [];
	if (_.isString(params.order)) {
		params.order.split(/[ ,;]+/g).forEach(function(name) {
			if (name.length < 2) {
				return;
			}
			if (name[0] === '-') {
				sort.push([name.substr(1), -1]);
			} else {
				sort.push([name, 1]);
			}
		});
	}

	//console.log('accessing', model, params.where, params.limit, params.offset);

	return new Promise(function(resolve, reject) {
		//console.log('in Promise!: ', model);
		self.db[model]
			.find(params.where)
			.select(params.select)
			.sort(sort)
			.skip(params.offset || 0)
			.limit(params.limit || limit)
			.exec(function(error, list) {
				if (error) {
					//console.log(error);
					return reject(error);
				}
				list = get(list);
				resolve(list);
			});
	});
};

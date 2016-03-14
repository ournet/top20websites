'use strict';

var utils = require('ournet.utils');
var _ = require('lodash');
var Promise = require('bluebird');

exports.md5 = function(value) {
	var crypto = require('crypto');

	return crypto.createHash('md5').update(value).digest('hex').toLowerCase();
};

module.exports = _.assign({
	_: _,
	Promise: Promise
}, utils, exports);

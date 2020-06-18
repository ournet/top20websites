"use strict";

var AccessService = require("./access");
var ControlService = require("./control");
var db = require("./models");
var mongoose = require("mongoose");

var cache = {};

var external = (module.exports = {
	AccessService: AccessService,
	ControlService: ControlService,
	Db: db,
	db: db,
	categories: require("./categories"),
	contentTypes: require("./content_types"),
	connect: function (connectionString, options, cb) {
		return mongoose.createConnection(connectionString, options, cb);
	},
	mongoose: mongoose,
	getAccessService: function (connectionString) {
		connectionString = connectionString || process.env.WEBSITES_CONNECTION;
		var key = "access-" + connectionString;
		if (cache[key]) {
			return cache[key];
		}
		db = external.getDb(connectionString);

		cache[key] = new AccessService(db);

		return cache[key];
	},
	getControlService: function (connectionString) {
		connectionString = connectionString || process.env.WEBSITES_CONNECTION;
		var key = "control-" + connectionString;
		if (cache[key]) {
			return cache[key];
		}
		db = external.getDb(connectionString);

		cache[key] = new ControlService(db);

		return cache[key];
	},
	getDb: function (connectionString) {
		connectionString = connectionString || process.env.WEBSITES_CONNECTION;
		var key = "db-" + connectionString;
		if (cache[key]) {
			return cache[key];
		}

		cache[key] = external.db(
			external.connect(connectionString, {
				useUnifiedTopology: true,
				useNewUrlParser: true,
			})
		);

		return cache[key];
	},
	clear: function () {
		cache = {};
	},
});

'use strict';

var mongoose = require('mongoose');
var Mixed = mongoose.Schema.Types.Mixed;
var Schema = mongoose.Schema;
var util = require('util');

var TABLE_PREFIX = process.env.TABLE_PREFIX || 'websites_';

function BaseSchema() {
	Schema.apply(this, arguments);

	if (!this.paths.createdAt) {
		this.add({
			createdAt: {
				type: Date,
				default: Date.now
			}
		});
	}
	if (!this.paths.updatedAt) {
		this.add({
			updatedAt: {
				type: Date
			}
		});
	}

	this.pre('save', function(next) {
		//if (!this.updatedAt) {
		//console.log('pre save', this);
		this.updatedAt = Date.now();
		//}
		next();
	});
}

util.inherits(BaseSchema, Schema);

var WebsiteRatings = new Schema({
	googleRank: {
		type: Number
	},
	googleBacklinks: {
		type: Number
	},
	googlePages: {
		type: Number
	},
	alexaRank: {
		type: Number
	},
	alexaCountryRank: {
		type: Number
	},
	alexaCountryPercent: {
		type: Number
	},
	alexaBacklinks: {
		type: Number
	},
	alexaPageviewsPerVisitor: {
		type: Number
	},
	alexaTimeOnSite: {
		type: Number
	},
	alexaSearchVisitsPercent: {
		type: Number
	},
	alexaBounceRate: {
		type: Number
	},
	yandexRank: {
		type: Number
	},
	rank: {
		type: Number,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now,
		required: true
	}
});

// WEBSITE

var Website = module.exports.Website = new BaseSchema({
	//int
	_id: Number,
	url: {
		type: String,
		required: true,
		lowercase: true,
		trim: true
	},
	host: {
		type: String,
		unique: true,
		required: true,
		lowercase: true,
		trim: true
	},
	title: {
		type: String,
		required: true,
		maxlength: 100,
		minlength: 2,
		trim: true
	},
	description: {
		type: String,
		//required: true,
		maxlength: 500,
		//minlength: 10,
		trim: true
	},
	keywords: [String],
	status: {
		type: String,
		required: true,
		default: 'active',
		enum: ['active', 'inactive'],
		index: true
	},
	contentType: {
		type: Number,
		index: true
			// trim: true,
			// lowercase: true,
			//enum: ['anunturi', 'bloguri', 'comert-electronic', 'corporative', 'forum', 'portal', 'stiri']
	},
	categories: [String],
	//subCategories: [Number],
	ip: {
		type: String,
		maxlength: 24
	},
	country: {
		type: String,
		//required: true,
		lowercase: true,
		trim: true,
		maxlength: 2,
		minlength: 2
	},
	lang: {
		type: String,
		//required: true,
		lowercase: true,
		trim: true,
		maxlength: 2,
		minlength: 2
	},
	ratings: Mixed,
	prevRatings: Mixed
}, {
	collection: [TABLE_PREFIX, 'websites'].join('')
});

Website.set('toObject', {
	getters: true
});
WebsiteRatings.set('toObject', {
	getters: true
});

// FEED

var Feed = module.exports.Feed = new BaseSchema({
	//int
	_id: Number,
	url: {
		type: String,
		required: true
	},
	urlHash: {
		type: String,
		unique: true,
		required: true,
		lowercase: true,
		trim: true,
		maxlength: 32
	},
	title: {
		type: String,
		required: true,
		maxlength: 100,
		minlength: 2,
		trim: true
	},
	status: {
		type: String,
		required: true,
		default: 'inactive',
		enum: ['active', 'inactive'],
		index: true
	},
	contentType: {
		type: Number,
		index: true
			// trim: true,
			// lowercase: true,
			//enum: ['anunturi', 'bloguri', 'comert-electronic', 'corporative', 'forum', 'portal', 'stiri']
	},
	country: {
		type: String,
		//required: true,
		lowercase: true,
		trim: true,
		maxlength: 2,
		minlength: 2
	},
	lang: {
		type: String,
		//required: true,
		lowercase: true,
		trim: true,
		maxlength: 2,
		minlength: 2
	},
	websiteId: {
		type: Number,
		required: true
	},
	itemReadedAt: {
		type: Date
	},
	itemReadedHash: {
		type: String
	},
	readError: {
		type: String
	},
	readErrorAt: {
		type: Date
	}
}, {
	collection: [TABLE_PREFIX, 'feeds'].join('')
});

Feed.set('toObject', {
	getters: true
});

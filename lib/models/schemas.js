'use strict';

var mongoose = require('mongoose');
var Mixed = mongoose.Schema.Types.Mixed;
var Schema = mongoose.Schema;
var util = require('util');

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
		enum: ['active', 'inactive']
	},
	contentType: {
		type: Number
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
});

Website.set('toObject', {
	getters: true
});
WebsiteRatings.set('toObject', {
	getters: true
});

// INT WEBSITE

var IntWebsite = module.exports.IntWebsite = new BaseSchema({
	//int
	_id: String,
	url: {
		type: String,
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
		maxlength: 512,
		//minlength: 10,
		trim: true
	},
	keywords: String,
	status: {
		type: String,
		required: true,
		default: 'active',
		enum: ['active', 'inactive']
	},
	category: {
		type: Number,
		index: true
	},
	country: {
		type: String,
		//required: true,
		lowercase: true,
		trim: true,
		maxlength: 2,
		minlength: 2,
		index: true
	},
	countViews: {
		type: Number,
		default: 1,
		required: true
	}
});

IntWebsite.set('toObject', {
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
});

Feed.set('toObject', {
	getters: true
});

var Topic = new Schema({
	name: {
		type: String,
		required: true
	},
	_id: Number,
	key: {
		type: String,
		required: true
	},
	uniqueName: {
		type: String,
		required: true
	},
	abbr: {
		type: String
	},
	category: {
		type: Number
	},
	type: {
		type: Number
	}
});

// WebPage

var WebPage = module.exports.WebPage = new BaseSchema({
	//int
	_id: Number,
	host: {
		type: String,
		required: true,
		maxlength: 64
	},
	path: {
		type: String,
		required: true,
		maxlength: 512
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
		maxlength: 200,
		minlength: 3,
		trim: true
	},
	uniqueName: {
		type: String,
		required: true,
		maxlength: 50,
		minlength: 3,
		trim: true
	},
	summary: {
		type: String,
		required: true,
		maxlength: 884,
		minlength: 3,
		trim: true
	},
	contentType: {
		type: Number,
		required: true
	},
	category: {
		type: Number
	},
	publishedAt: {
		type: Date,
		required: true,
		default: Date.now
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
		expires: 60 * 60 * 24 * 2 // 2 days
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
	topics: [Topic]
});

WebPage.set('toObject', {
	getters: true
});

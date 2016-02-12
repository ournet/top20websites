'use strict';

var _ = require('./utils')._;

var TYPES = [{
	id: 6,
	name: 'anunturi',
	ro: 'Anunțuri',
	ru: 'Объявлений'
}, {
	id: 2,
	name: 'bloguri',
	ro: 'Bloguri',
	ru: 'Блоги'
}, {
	id: 5,
	name: 'comert-electronic',
	ro: 'Comerț electronic',
	ru: 'Электронная торговля'
}, {
	id: 7,
	name: 'corporative',
	ro: 'Corporative',
	ru: 'Корпоративные'
}, {
	id: 3,
	name: 'forum',
	ro: 'Forum',
	ru: 'Форум'
}, {
	id: 4,
	name: 'portal',
	ro: 'Portal',
	ru: 'Портал'
}, {
	id: 1,
	name: 'stiri',
	ro: 'Știri',
	ru: 'Новости'
}];

function find(collection, name, value) {
	var el;
	for (var i = collection.length - 1; i >= 0; i--) {
		el = collection[i];
		if (el[name] === value) {
			return el;
		}
	}
}

exports.types = function() {
	return TYPES;
};

exports.type = function(key) {
	var name = _.isNumber(key) ? 'id' : 'name';
	return find(TYPES, name, key);
};

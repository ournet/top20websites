'use strict';

var _ = require('./utils')._;

var CATEGORIES = [{
	id: 37,
	ro: 'Auto, Moto',
	name: 'auto-moto',
	ru: 'Авто, мото',
	en: 'Auto, Moto'
}, {
	id: 38,
	ro: 'Securitate',
	name: 'securitate',
	ru: 'Безопасность',
	en: 'Security'
}, {
	id: 39,
	ro: 'Business, Economie',
	name: 'business',
	ru: 'Бизнес и экономика',
	en: 'Business and Economy'
}, {
	id: 40,
	ro: 'Stat și Societate',
	name: 'stat-si-societate',
	ru: 'Государство и общество',
	en: 'Government and Society'
}, {
	id: 42,
	ro: 'Divertisment',
	name: 'divertisment',
	ru: 'Досуг, развлечения',
	en: 'Entertainment'
}, {
	id: 43,
	ro: 'Femei',
	name: 'femei',
	ru: 'Женский клуб',
	en: 'Women'
}, {
	id: 44,
	ro: 'Lege și drept',
	name: 'lege-drept',
	ru: 'Закон и право',
	en: 'Law'
}, {
	id: 45,
	ro: 'Internet, Comunicații',
	name: 'internet-comunicatii',
	ru: 'Интернет, связь',
	en: 'Internet, Communications'
}, {
	id: 46,
	ro: 'Sănătate, Frumusețe',
	name: 'sanatate-frumusete',
	ru: 'Красота и здоровье',
	en: 'Health & Beauty'
}, {
	id: 47,
	ro: 'Artă și Cultură',
	name: 'arta-cultura',
	ru: 'Культура и искусство',
	en: 'Arts and Culture'
}, {
	id: 48,
	ro: 'Medicină',
	name: 'medicina',
	ru: 'Медицина',
	en: 'Medicine'
}, {
	id: 49,
	ro: 'Modă și Stil',
	name: 'moda-stil',
	ru: 'Мода и стиль',
	en: 'Fashion and Style'
}, {
	id: 50,
	ro: 'Știință',
	name: 'stiinta',
	ru: 'Наука',
	en: 'Science'
}, {
	id: 51,
	ro: 'Imobiliare',
	name: 'imobiliare',
	ru: 'Недвижимость',
	en: 'Real Estate'
}, {
	id: 52,
	ro: 'Știri, Massmedia',
	name: 'stiri-massmedia',
	ru: 'Новости и СМИ',
	en: 'News, Mass Media'
}, {
	id: 53,
	ro: 'Educație, Învățământ',
	name: 'educatie-invatamant',
	ru: 'Образование',
	en: 'Education'
}, {
	id: 54,
	ro: 'Copii, Adolescenți',
	name: 'copii-adolescenti',
	ru: 'Подросткам и детям',
	en: 'Children, Teens'
}, {
	id: 55,
	ro: 'Călătorii',
	name: 'calatorii',
	ru: 'Путешествия',
	en: 'Travel'
}, {
	id: 56,
	ro: 'Lucru și carieră',
	name: 'lucru-cariera',
	ru: 'Работа и карьера',
	en: 'Work and Career'
}, {
	id: 57,
	ro: 'Religie',
	name: 'religie',
	ru: 'Религия',
	en: 'Religion'
}, {
	id: 58,
	ro: 'Casă și familie',
	name: 'casa-familie',
	ru: 'Семья и быт',
	en: 'Home & Family'
}, {
	id: 59,
	ro: 'Sport',
	name: 'sport',
	ru: 'Спорт',
	en: 'Sports'
}, {
	id: 60,
	ro: 'Construcții, Reparații',
	name: 'constructii',
	ru: 'Строительство и ремонт',
	en: 'Construction, Repairs'
}, {
	id: 61,
	ro: 'Comerț',
	name: 'comert',
	ru: 'Торговля',
	en: 'Trade'
}, {
	id: 970,
	ro: 'Informație',
	name: 'informatie',
	ru: 'Справки',
	en: 'References'
}];

var SUB_CATEGORIES = {
	37: [{
		id: 62,
		ro: 'Automobile',
		name: 'automobile',
		ru: 'Автомобили'
	}, {
		id: 63,
		ro: 'Asigurare auto',
		name: 'asigurare-auto',
		ru: ' Автострахование'
	}, {
		id: 64,
		ro: 'Siguranța rutieră',
		name: 'siguranta-rutiera',
		ru: 'Безопасность движения'
	}, {
		id: 65,
		ro: 'Accesorii',
		name: 'accesorii',
		ru: ' Запчасти, оборудование'
	}, {
		id: 66,
		ro: 'Cluburi auto',
		name: 'cluburi-auto',
		ru: 'Клубы автовладельцев'
	}, {
		id: 67,
		ro: 'Motociclete',
		name: 'motociclete',
		ru: 'Мотоциклы'
	}, {
		id: 68,
		ro: 'Școli auto',
		name: 'scoli-auto',
		ru: 'Обучение вождению'
	}, {
		id: 69,
		ro: 'Servicii auto',
		name: 'servicii-auto',
		ru: 'Услуги'
	}],
	38: [{
		id: 70,
		ro: 'Securitate business',
		name: 'securitate-business',
		ru: 'Безопасность бизнеса'
	}, {
		id: 71,
		ro: 'Securitatea casei',
		name: 'securitatea-casei',
		ru: 'Безопасность жилища'
	}, {
		id: 72,
		ro: 'Securitate informațională',
		name: 'securitate-informationala',
		ru: 'Информационная безопасность'
	}, {
		id: 73,
		ro: 'Securitate personală',
		name: 'securitate-personala',
		ru: 'Личная безопасность'
	}, {
		id: 74,
		ro: 'Sănătate, Siguranță',
		name: 'sanatate-siguranta',
		ru: 'Охрана труда и техника безопасности'
	}, {
		id: 75,
		ro: 'Servicii de securitate',
		name: 'servicii-de-securitate',
		ru: 'Охранная деятельность'
	}, {
		id: 76,
		ro: 'Sisteme de securitate',
		name: 'sisteme-de-securitate',
		ru: 'Охранные системы'
	}, {
		id: 77,
		ro: 'Securitate incendii',
		name: 'securitate-incendii',
		ru: 'Пожарная безопасность'
	}],
	39: [{
		id: 79,
		ro: 'Automatizare',
		name: 'automatizare',
		ru: 'Автоматизация'
	}, {
		id: 80,
		ro: 'Inovații',
		name: 'inovatii',
		ru: 'Инновации'
	}, {
		id: 81,
		ro: 'Silvicultură',
		name: 'silvicultura',
		ru: 'Лесное хозяйство'
	}, {
		id: 82,
		ro: 'Logistică',
		name: 'logistica',
		ru: 'Логистика'
	}, {
		id: 83,
		ro: 'Organizare business',
		name: 'organizare-business',
		ru: 'Организация бизнеса'
	}, {
		id: 84,
		ro: 'Industrie',
		name: 'industrie',
		ru: 'Промышленность'
	}, {
		id: 85,
		ro: 'Publicitate, Marketing',
		name: 'publicitate-marketing',
		ru: 'Реклама, маркетинг, PR'
	}, {
		id: 86,
		ro: 'Agricultură',
		name: 'agricultura',
		ru: 'Сельское хозяйство'
	}, {
		id: 87,
		ro: 'Asigurare',
		name: 'asigurare',
		ru: 'Страхование'
	}, {
		id: 88,
		ro: 'Telecomunicații',
		name: 'telecomunicatii',
		ru: 'Телекоммуникации'
	}, {
		id: 89,
		ro: 'Finanțe',
		name: 'finante',
		ru: 'Финансы'
	}],
	40: [{
		id: 90,
		ro: 'Armată și armament',
		name: 'armata-si-armament',
		ru: 'Армия и вооружение'
	}, {
		id: 91,
		ro: 'Instituții publice',
		name: 'institutii-publice',
		ru: 'Власть'
	}, {
		id: 92,
		ro: 'Relații internaționale',
		name: 'relatii-internationale',
		ru: 'Международные отношения'
	}, {
		id: 93,
		ro: 'Relații interne',
		name: 'relatii-interne',
		ru: 'Национальные отношения'
	}, {
		id: 94,
		ro: 'ONG-uri',
		name: 'ong',
		ru: 'Неправительственные организации'
	}, {
		id: 95,
		ro: 'Protecție socială',
		name: 'protectie-sociala',
		ru: 'Органы социальной защиты'
	}, {
		id: 96,
		ro: 'Partide și organizații',
		name: 'partide-organizatii',
		ru: 'Партии и организации'
	}, {
		id: 97,
		ro: 'Organe legislative',
		name: 'organe-legislative',
		ru: 'Правоохранительные органы'
	}, {
		id: 98,
		ro: 'Servicii',
		name: 'servicii',
		ru: 'Службы спасения'
	}],
	42: [{
		id: 99,
		ro: 'Postere',
		name: 'postere',
		ru: 'Афиша'
	}, {
		id: 100,
		ro: 'Adult',
		name: 'adult',
		ru: 'Для взрослых'
	}, {
		id: 101,
		ro: 'Jocuri',
		name: 'jocuri',
		ru: 'Игры'
	}, {
		id: 102,
		ro: 'Locuri de odihnă',
		name: 'locuri-de-odihna',
		ru: 'Места для отдыха'
	}, {
		id: 103,
		ro: 'Comunicare, Dating',
		name: 'comunicare-dating',
		ru: 'Общение, знакомства'
	}, {
		id: 104,
		ro: 'Sărbători',
		name: 'sarbatori',
		ru: 'Праздники'
	}, {
		id: 105,
		ro: 'Hobby-uri',
		name: 'hobby',
		ru: 'Увлечения, хобби'
	}, {
		id: 106,
		ro: 'Umor',
		name: 'umor',
		ru: 'Юмор'
	}],
	43: [{
		id: 107,
		ro: 'Sarcina și naștere',
		name: 'sarcina-nastere',
		ru: 'Беременность и роды'
	}, {
		id: 108,
		ro: 'Agenții de căsătorii',
		name: 'agentii-de-casatorii',
		ru: 'Брачные агентства'
	}, {
		id: 109,
		ro: 'Copii',
		name: 'copii',
		ru: 'Дети'
	}, {
		id: 110,
		ro: 'Sănătate, Frumusețe',
		name: 'sanatate-frumusete',
		ru: 'Красота и здоровье'
	}, {
		id: 111,
		ro: 'Modă și Stil',
		name: 'moda-stil',
		ru: 'Мода и стиль'
	}, {
		id: 112,
		ro: 'Lucru manual',
		name: 'lucru-manual',
		ru: 'Рукоделие'
	}, {
		id: 113,
		ro: 'Nunți',
		name: 'nunti',
		ru: 'Свадьбы'
	}],
	44: [{
		id: 114,
		ro: 'Acte normative',
		name: 'acte-normative',
		ru: 'Законы'
	}, {
		id: 115,
		ro: 'Judiciar',
		name: 'judiciar',
		ru: 'Судебная власть'
	}, {
		id: 116,
		ro: 'Documentare',
		name: 'documentare',
		ru: 'Формы документов'
	}, {
		id: 117,
		ro: 'Servicii juridice',
		name: 'servicii-juridice',
		ru: 'Юридические услуги'
	}],
	45: [{
		id: 118,
		ro: 'Acces la internet',
		name: 'acces-internet',
		ru: 'Доступ в интернет'
	}, {
		id: 119,
		ro: 'Conecțiuni mobile',
		name: 'conectiuni-mobile',
		ru: 'Мобильная связь'
	}, {
		id: 120,
		ro: 'Radio online',
		name: 'radio-online',
		ru: 'Онлайн-радио'
	}, {
		id: 121,
		ro: 'TV online',
		name: 'tv-online',
		ru: 'Онлайн-телевидение'
	}, {
		id: 122,
		ro: 'Promovare site-uri',
		name: 'promovare-site',
		ru: 'Продвижение сайтов'
	}, {
		id: 123,
		ro: 'Publicitate online',
		name: 'publicitate-online',
		ru: 'Реклама в интернете'
	}, {
		id: 124,
		ro: 'Creare site-uri',
		name: 'creare-site',
		ru: 'Создание сайтов'
	}, {
		id: 125,
		ro: 'Poștă electronică',
		name: 'posta-electronica',
		ru: 'Электронная почта'
	}],
	46: [{
		id: 126,
		ro: 'Mod de viață sănătos',
		name: 'mod-de-viata-sanatos',
		ru: 'Здоровый образ жизни'
	}, {
		id: 127,
		ro: 'Cosmetică',
		name: 'cosmetica',
		ru: 'Косметика'
	}, {
		id: 128,
		ro: 'Parfumerie',
		name: 'parfumerie',
		ru: 'Парфюмерия'
	}, {
		id: 129,
		ro: 'Saloane de frumusețe',
		name: 'saloane-de-frumusete',
		ru: 'Салоны красоты'
	}, {
		id: 130,
		ro: 'Tatuaje și piercing',
		name: 'tatuaje-piercing',
		ru: 'Татуировки и пирсинг'
	}, {
		id: 131,
		ro: 'Produse',
		name: 'produse',
		ru: 'Товары'
	}, {
		id: 132,
		ro: 'Cluburi de fitness',
		name: 'cluburi-de-fitness',
		ru: 'Фитнес-клубы'
	}],
	47: [{
		id: 133,
		ro: 'Animație',
		name: 'animatie',
		ru: 'Анимация'
	}, {
		id: 135,
		ro: 'Arhitectură',
		name: 'arhitectura',
		ru: 'Архитектура'
	}, {
		id: 136,
		ro: 'Biblioteci',
		name: 'biblioteci',
		ru: 'Библиотеки'
	}, {
		id: 137,
		ro: 'Arta vizuală',
		name: 'arta-vizuala',
		ru: 'Изобразительное искусство'
	}, {
		id: 138,
		ro: 'Film',
		name: 'film',
		ru: 'Кино'
	}, {
		id: 139,
		ro: 'Literatură',
		name: 'literatura',
		ru: 'Литература'
	}, {
		id: 140,
		ro: 'Muzee',
		name: 'muzee',
		ru: 'Музеи'
	}, {
		id: 141,
		ro: 'Muzică',
		name: 'muzica',
		ru: 'Музыка'
	}, {
		id: 142,
		ro: 'Dans',
		name: 'dans',
		ru: 'Танец'
	}, {
		id: 143,
		ro: 'Uniuni de creație',
		name: 'uniuni-de-creatie',
		ru: 'Творческие союзы'
	}, {
		id: 144,
		ro: 'Teatru',
		name: 'teatru',
		ru: 'Театр'
	}, {
		id: 145,
		ro: 'Fotografie',
		name: 'fotografie',
		ru: 'Фотография'
	}, {
		id: 146,
		ro: 'Tradiții',
		name: 'traditii',
		ru: 'Традиции'
	}],
	48: [{
		id: 147,
		ro: 'Medicina tradițională',
		name: 'medicina-traditionala',
		ru: 'Альтернативная медицина'
	}, {
		id: 148,
		ro: 'Sarcină și naștere',
		name: 'sarcina-nastere',
		ru: 'Беременность и роды'
	}, {
		id: 149,
		ro: 'Boli',
		name: 'boli',
		ru: 'Болезни'
	}, {
		id: 150,
		ro: 'Veterinărie',
		name: 'veterinarie',
		ru: 'Ветеринария'
	}, {
		id: 151,
		ro: 'Deprinderi dăunătoare',
		name: 'deprinderi-daunatoare',
		ru: 'Вредные привычки'
	}, {
		id: 152,
		ro: 'Documentere',
		name: 'documentere',
		ru: 'Справки и документы'
	}, {
		id: 153,
		ro: 'Medicamente',
		name: 'medicamente',
		ru: 'Медицинские препараты'
	}, {
		id: 154,
		ro: 'Aparate medicinale',
		name: 'aparate-medicinale',
		ru: 'Медицинское оборудование'
	}, {
		id: 155,
		ro: 'Servicii medicale',
		name: 'servicii-medicale',
		ru: 'Медицинское обслуживание'
	}, {
		id: 156,
		ro: 'Asigurare',
		name: 'asigurare',
		ru: 'Страхование'
	}],
	49: [{
		id: 157,
		ro: 'Jurnale, Reviste',
		name: 'jurnale-reviste',
		ru: 'Журналы'
	}, {
		id: 158,
		ro: 'Magazine, Ateliere',
		name: 'magazine-ateliere',
		ru: 'Магазины, Ателье'
	}, {
		id: 159,
		ro: 'Machiaj și cosmetică',
		name: 'machiaj-cosmetica',
		ru: 'Макияж, косметика'
	}, {
		id: 160,
		ro: 'Îmbrăcăminte',
		name: 'imbracaminte',
		ru: 'Одежда, обувь'
	}, {
		id: 161,
		ro: 'Parfumerie',
		name: 'parfumerie',
		ru: 'Парфюмерия'
	}, {
		id: 162,
		ro: 'Sfaturi',
		name: 'sfaturi',
		ru: 'Советы, рекомендации'
	}],
	50: [{
		id: 163,
		ro: 'Organe administrative',
		name: 'organe-administrative',
		ru: 'Административные органы'
	}, {
		id: 164,
		ro: 'Granturi',
		name: 'granturi',
		ru: 'Гранты'
	}, {
		id: 165,
		ro: 'Științe umaniste',
		name: 'stiinte-umaniste',
		ru: 'Гуманитарные'
	}, {
		id: 166,
		ro: 'Naturale și exacte',
		name: 'naturale-exacte',
		ru: 'Естественные и точные'
	}, {
		id: 167,
		ro: 'Jurnale, Publicații',
		name: 'jurnale-publicatii',
		ru: 'Журналы, публикации'
	}, {
		id: 168,
		ro: 'Conferințe',
		name: 'conferinte',
		ru: 'Конференции'
	}, {
		id: 169,
		ro: 'Centre științifice',
		name: 'centre-stiintifice',
		ru: 'Научные центры'
	}, {
		id: 170,
		ro: 'Oameni de știință',
		name: 'oameni-de-stiința',
		ru: 'Сайты ученых'
	}, {
		id: 171,
		ro: 'Tehnică',
		name: 'tehnica',
		ru: 'Технические'
	}],
	51: [{
		id: 172,
		ro: 'Arendă',
		name: 'arenda',
		ru: 'Аренда'
	}, {
		id: 173,
		ro: 'Expoziții',
		name: 'expozitii',
		ru: 'Выставки'
	}, {
		id: 174,
		ro: 'Parcări și garaje',
		name: 'parcari-garaje',
		ru: 'Гаражи и автостоянки'
	}, {
		id: 175,
		ro: 'Utilități',
		name: 'utilitati',
		ru: 'ЖКХ'
	}, {
		id: 176,
		ro: 'Urban',
		name: 'urban',
		ru: 'Городская'
	}, {
		id: 177,
		ro: 'Rural',
		name: 'rural',
		ru: 'Загородная'
	}, {
		id: 178,
		ro: 'Peste hotare',
		name: 'peste-hotare',
		ru: 'Зарубежная'
	}, {
		id: 179,
		ro: 'Ipotecă',
		name: 'ipoteca',
		ru: 'Ипотека'
	}, {
		id: 180,
		ro: 'Evaluare',
		name: 'evaluare',
		ru: 'Оценка'
	}, {
		id: 181,
		ro: 'Vânzare',
		name: 'vanzare',
		ru: 'Коммерческая'
	}, {
		id: 182,
		ro: 'Asigurare imobiliară',
		name: 'asigurare-imobiliara',
		ru: 'Страхование имущества'
	}, {
		id: 183,
		ro: 'Teren',
		name: 'teren',
		ru: 'Участки'
	}],
	52: [{
		id: 184,
		ro: 'Analiză, Recenzii',
		name: 'analiza-recenzii',
		ru: 'Аналитика, обзоры'
	}, {
		id: 185,
		ro: 'Bloguri',
		name: 'bloguri',
		ru: 'Блоги'
	}, {
		id: 186,
		ro: 'Ziare, Reviste',
		name: 'ziare-reviste',
		ru: 'Газеты, журналы'
	}, {
		id: 187,
		ro: 'Agenții de știri',
		name: 'agentii-de-stiri',
		ru: 'Информационные агентства'
	}, {
		id: 188,
		ro: 'Organizații de jurnaliști',
		name: 'organizatii-de-jurnalisti',
		ru: 'Организации журналистов'
	}, {
		id: 189,
		ro: 'Radio',
		name: 'radio',
		ru: 'Радио'
	}, {
		id: 190,
		ro: 'TV',
		name: 'tv',
		ru: 'Телевидение'
	}],
	53: [{
		id: 191,
		ro: 'Învățământ non-formal',
		name: 'invatamant-non-formal',
		ru: 'Внешкольное образование'
	}, {
		id: 192,
		ro: 'Publicații',
		name: 'publicatii',
		ru: 'Вузовские издания'
	}, {
		id: 193,
		ro: 'Învățământ superior',
		name: 'invatamant-superior',
		ru: 'Вузы'
	}, {
		id: 194,
		ro: 'Defectologie',
		name: 'defectologie',
		ru: 'Дефектология'
	}, {
		id: 195,
		ro: 'Învățământ la distanță',
		name: 'invatamant-la-distanta',
		ru: 'Дистанционное образование'
	}, {
		id: 196,
		ro: 'Învățământ preșcolar',
		name: 'invatamant-prescolar',
		ru: 'Дошкольное воспитание'
	}, {
		id: 197,
		ro: 'Informație',
		name: 'informatie',
		ru: 'Методические материалы'
	}, {
		id: 198,
		ro: 'Servicii educaționale',
		name: 'servicii-educationale',
		ru: 'Образовательные услуги'
	}, {
		id: 199,
		ro: 'Studii în trăinătate',
		name: 'studii-in-trainatate',
		ru: 'Обучение за рубежом'
	}, {
		id: 200,
		ro: 'Organe de control',
		name: 'organe-de-control',
		ru: 'Органы управления'
	}, {
		id: 201,
		ro: 'Dezvoltare personală',
		name: 'dezvoltare-personala',
		ru: 'Повышение квалификации'
	}, {
		id: 202,
		ro: 'Profesori',
		name: 'profesori',
		ru: 'Сайты педагогов'
	}, {
		id: 203,
		ro: 'Învățământ școlar',
		name: 'invatamant-scolar',
		ru: 'Среднее образование'
	}, {
		id: 204,
		ro: 'Rechezite școlare',
		name: 'rechezite-scolare',
		ru: 'Средства обучения'
	}, {
		id: 205,
		ro: 'Viața studențească',
		name: 'viata-studenteasca',
		ru: 'Студенческая жизнь'
	}, {
		id: 206,
		ro: 'Teorie și istorie',
		name: 'teorie-istorie',
		ru: 'Теория и история'
	}, {
		id: 207,
		ro: 'Fonduri, Burse, Granturi',
		name: 'fonduri-burse-granturi',
		ru: 'Фонды, стипендии, гранты'
	}],
	54: [{
		id: 208,
		ro: 'Jurnale',
		name: 'jurnale',
		ru: 'Журналы'
	}, {
		id: 209,
		ro: 'Jocuri',
		name: 'jocuri',
		ru: 'Игры'
	}, {
		id: 210,
		ro: 'Cluburi',
		name: 'cluburi',
		ru: 'Клубы'
	}, {
		id: 211,
		ro: 'Modă și stil',
		name: 'moda-stil',
		ru: 'Мода и стиль'
	}, {
		id: 212,
		ro: 'Muzică',
		name: 'muzica',
		ru: 'Музыка'
	}, {
		id: 213,
		ro: 'Comunicare',
		name: 'comunicare',
		ru: 'Общение'
	}, {
		id: 214,
		ro: 'Lucru',
		name: 'lucru',
		ru: 'Работа для молодежи'
	}, {
		id: 215,
		ro: 'Divertisment',
		name: 'divertisment',
		ru: 'Развлечения'
	}, {
		id: 216,
		ro: 'Sport',
		name: 'sport',
		ru: 'Спорт'
	}, {
		id: 217,
		ro: 'Artă',
		name: 'arta',
		ru: 'Творчество'
	}, {
		id: 218,
		ro: 'Studii',
		name: 'studii',
		ru: 'Учеба'
	}],
	55: [{
		id: 219,
		ro: 'Odihnă activă',
		name: 'odihna-activa',
		ru: 'Активный отдых'
	}, {
		id: 220,
		ro: 'Hoteluri',
		name: 'hoteluri',
		ru: 'Гостиницы'
	}, {
		id: 221,
		ro: 'Pașapoarte și vize',
		name: 'pasapoarte-vize',
		ru: 'Оформление загранпаспортов и виз'
	}, {
		id: 222,
		ro: 'Evaluări, Recenzii',
		name: 'evaluari-recenzii',
		ru: 'Рейтинги, отзывы'
	}, {
		id: 223,
		ro: 'Sanatorii',
		name: 'sanatorii',
		ru: 'Санатории'
	}, {
		id: 224,
		ro: 'Destinații',
		name: 'destinatii',
		ru: 'Страны'
	}, {
		id: 225,
		ro: 'Agenții turistice',
		name: 'agentii-turistice',
		ru: 'Туроператоры и агентства'
	}, {
		id: 226,
		ro: 'Excursii',
		name: 'excursii',
		ru: 'Туры и экскурсии'
	}],
	56: [{
		id: 227,
		ro: 'Piața brațelor de muncă',
		name: 'piata-bratelor-de-munca',
		ru: 'Биржи труда'
	}, {
		id: 228,
		ro: 'Locuri de muncă',
		name: 'locuri-de-munca',
		ru: 'Вакансии, резюме'
	}, {
		id: 229,
		ro: 'Agenții',
		name: 'agentii',
		ru: 'Кадровые агентства'
	}, {
		id: 230,
		ro: 'Dezvoltare profesională',
		name: 'dezvoltare-profesionala',
		ru: 'Повышение квалификации'
	}, {
		id: 231,
		ro: 'Lucru pe internet',
		name: 'lucru-pe-internet',
		ru: 'Работа в интернете'
	}, {
		id: 232,
		ro: 'Lucru pentru tineri',
		name: 'lucru-pentru-tineri',
		ru: 'Работа для молодежи'
	}, {
		id: 233,
		ro: 'Freelance',
		name: 'freelance',
		ru: 'Фриланс'
	}, {
		id: 234,
		ro: 'Lucru peste hotare',
		name: 'lucru-peste-hotare',
		ru: 'Работа за рубежом'
	}, {
		id: 235,
		ro: 'Munca de sezon',
		name: 'munca-de-sezon',
		ru: 'Сезонная работа'
	}, {
		id: 236,
		ro: 'Drepturi',
		name: 'drepturi',
		ru: 'Трудовое право'
	}],
	57: [{
		id: 237,
		ro: 'Ateism',
		name: 'ateism',
		ru: 'Атеизм'
	}, {
		id: 238,
		ro: 'Budism',
		name: 'budism',
		ru: 'Буддизм'
	}, {
		id: 239,
		ro: 'Islam',
		name: 'islam',
		ru: 'Ислам'
	}, {
		id: 240,
		ro: 'Istoria religiei',
		name: 'istoria-religiei',
		ru: 'Религиозная история'
	}, {
		id: 241,
		ro: 'Iudaism',
		name: 'iudaism',
		ru: 'Иудаизм'
	}, {
		id: 242,
		ro: 'Pelerinaj',
		name: 'pelerinaj',
		ru: 'Паломничество'
	}, {
		id: 243,
		ro: 'Educație religioasă',
		name: 'educatie-religioasa',
		ru: 'Религиозное образование'
	}, {
		id: 244,
		ro: 'Creștinism',
		name: 'crestinism',
		ru: 'Христианство'
	}, {
		id: 245,
		ro: 'Păgânism',
		name: 'paganism',
		ru: 'Язычество'
	}],
	58: [{
		id: 246,
		ro: 'Servicii casnice',
		name: 'servicii-casnice',
		ru: 'Бытовое обслуживание'
	}, {
		id: 247,
		ro: 'Copii',
		name: 'copii',
		ru: 'Дети'
	}, {
		id: 248,
		ro: 'Animale de companie',
		name: 'animale-de-companie',
		ru: 'Домашние животные'
	}, {
		id: 249,
		ro: 'Gastronomie',
		name: 'gastronomie',
		ru: 'Кулинария'
	}, {
		id: 250,
		ro: 'Înmormântări',
		name: 'inmormantari',
		ru: 'Ритуальные услуги'
	}, {
		id: 251,
		ro: 'Grădină',
		name: 'gradina',
		ru: 'Сад и огород'
	}],
	59: [{
		id: 252,
		ro: 'Bowling',
		name: 'bowling',
		ru: 'Боулинг'
	}, {
		id: 253,
		ro: 'Sporturi de apă',
		name: 'sporturi-de-apa',
		ru: 'Водные виды'
	}, {
		id: 254,
		ro: 'Sporturi de iarnă',
		name: 'sporturi-de-iarna',
		ru: 'Зимние виды'
	}, {
		id: 255,
		ro: 'Jocuri intelectuale',
		name: 'jocuri-intelectuale',
		ru: 'Интеллектуальные игры'
	}, {
		id: 256,
		ro: 'Jocuri de echipă',
		name: 'jocuri-de-echipa',
		ru: 'Командные виды'
	}, {
		id: 257,
		ro: 'Atletica ușoară',
		name: 'atletica-usoara',
		ru: 'Легкая атлетика'
	}, {
		id: 258,
		ro: 'Societăți, Federații',
		name: 'societati-federatii',
		ru: 'Общества, федерации'
	}, {
		id: 259,
		ro: 'Centre de sănătate',
		name: 'centre-de-sanatate',
		ru: 'Оздоровительные центры'
	}, {
		id: 260,
		ro: 'Cluburi sportive',
		name: 'cluburi-sportive',
		ru: 'Спортивные клубы'
	}, {
		id: 261,
		ro: 'Articole sportive',
		name: 'articole-sportive',
		ru: 'Спортивные товары '
	}, {
		id: 262,
		ro: 'Fanclub-uri',
		name: 'fanclub',
		ru: 'Фан-клубы'
	}, {
		id: 263,
		ro: 'Fitness, Culturism',
		name: 'fitness-culturism',
		ru: 'Фитнес и бодибилдинг'
	}, {
		id: 264,
		ro: 'Sporturi extreme',
		name: 'sporturi-extreme',
		ru: 'Экстремальный спорт'
	}],
	60: [{
		id: 265,
		ro: 'Meteriale și echipament',
		name: 'meteriale-echipament',
		ru: 'Материалы и оборудование'
	}, {
		id: 266,
		ro: 'Proiectare',
		name: 'proiectare',
		ru: 'Проектирование'
	}, {
		id: 267,
		ro: 'Sfaturi și consiliere',
		name: 'sfaturi-consiliere',
		ru: 'Советы и рекомендации'
	}, {
		id: 268,
		ro: 'Expertiza tehnică',
		name: 'expertiza-tehnica',
		ru: 'Техническая экспертиза и надзор'
	}, {
		id: 269,
		ro: 'Contractori, Echipe',
		name: 'contractori-echipe',
		ru: 'Подрядчики, бригады'
	}],
	61: [{
		id: 270,
		ro: 'Auto, Moto',
		name: 'auto-moto',
		ru: 'Автомобили'
	}, {
		id: 271,
		ro: 'Farmacii, Optică',
		name: 'farmacii-optica',
		ru: 'Аптеки, оптики'
	}, {
		id: 272,
		ro: 'Vilă și grădină',
		name: 'vila-gradina',
		ru: 'Для дачи и сада'
	}, {
		id: 273,
		ro: 'Pentru copii',
		name: 'pentru-copii',
		ru: 'Для детей'
	}, {
		id: 274,
		ro: 'Pentru animale',
		name: 'pentru-animale',
		ru: 'Для животных'
	}, {
		id: 275,
		ro: 'Pentru birou',
		name: 'pentru-birou',
		ru: 'Для офиса'
	}, {
		id: 276,
		ro: 'Cărți',
		name: 'carti',
		ru: 'Книги'
	}, {
		id: 277,
		ro: 'Frumusețe, Sănătate',
		name: 'frumusete-sanatate',
		ru: 'Красота и здоровье'
	}, {
		id: 278,
		ro: 'Muzică, Film',
		name: 'muzica-film',
		ru: 'Музыка, фильмы'
	}, {
		id: 279,
		ro: 'Îmbrăcăminte, Accesorii',
		name: 'imbracaminte',
		ru: 'Одежда, обувь, аксессуары '
	}, {
		id: 280,
		ro: 'Cadouri, Flori',
		name: 'cadouri-flori',
		ru: 'Подарки, цветы'
	}, {
		id: 281,
		ro: 'Produse alimentare',
		name: 'produse-alimentare',
		ru: 'Продукты'
	}, {
		id: 282,
		ro: 'Sport, Turism',
		name: 'sport-turism',
		ru: 'Спорт, Туризм'
	}, {
		id: 283,
		ro: 'Materiale de construcție',
		name: 'materiale-de-constructie',
		ru: 'Строительные материалы'
	}, {
		id: 284,
		ro: 'Pentru casă',
		name: 'pentru-casa',
		ru: 'Товары для дома'
	}, {
		id: 285,
		ro: 'Electrocasnice',
		name: 'electrocasnice',
		ru: 'Электронная техника'
	}, {
		id: 286,
		ro: 'Bijuterii',
		name: 'bijuterii',
		ru: 'Ювелирные изделия'
	}],
	970: [{
		id: 971,
		ro: 'Calendare',
		name: 'calendare',
		ru: 'Календари'
	}, {
		id: 972,
		ro: 'Hărți și diagrame',
		name: 'harti-diagrame',
		ru: 'Карты и схемы'
	}, {
		id: 973,
		ro: 'Codurile de orașe și țări',
		name: 'codurile-de-orase-tari',
		ru: 'Коды городов и стран'
	}, {
		id: 974,
		ro: 'Personalități',
		name: 'personalitati',
		ru: 'Персоны'
	}, {
		id: 975,
		ro: 'Vremea',
		name: 'vremea',
		ru: 'Погода'
	}, {
		id: 976,
		ro: 'ZIP coduri',
		name: 'zip-coduri',
		ru: 'Почтовые индексы'
	}, {
		id: 977,
		ro: 'Orar transport',
		name: 'orar-transport',
		ru: 'Расписания транспорта'
	}, {
		id: 978,
		ro: 'Dicționare, traduceri',
		name: 'dictionare-traduceri',
		ru: 'Словари, переводчики'
	}, {
		id: 979,
		ro: 'Statistici',
		name: 'statistici',
		ru: 'Статистические данные'
	}, {
		id: 980,
		ro: 'Enciclopedii',
		name: 'enciclopedii',
		ru: 'Энциклопедии'
	}]
};

function find(collection, name, value) {
	var el;
	for (var i = collection.length - 1; i >= 0; i--) {
		el = collection[i];
		if (el[name] === value) {
			return el;
		}
	}
}

exports.categories = function() {
	return CATEGORIES;
};

exports.category = function(key) {
	var name = _.isNumber(key) ? 'id' : 'name';
	return find(CATEGORIES, name, key);
};

exports.subCategories = function(id) {
	if (id) {
		return SUB_CATEGORIES[id];
	}
	return SUB_CATEGORIES;
};

exports.subCategory = function(id, key) {
	var name = _.isNumber(key) ? 'id' : 'name';
	return find(SUB_CATEGORIES[id], name, key);
};

const path = require('path');

module.exports = {
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'ru'],
		localeDetection: false,
		localePath: path.resolve('./public/locales'),
	},
	react: {
		useSuspense: false,
	},
	localeSubpaths: {
		en: 'en',
		ru: 'ru',
	},
};

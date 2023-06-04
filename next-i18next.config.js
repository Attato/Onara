module.exports = {
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'ru'],
		localeDetection: true,
		localePath: path.resolve('./public/locales'),
	},
	react: {
		useSuspense: false, // Включение отложенной загрузки переводов
	},
};

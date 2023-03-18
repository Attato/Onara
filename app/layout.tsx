import './globals.scss';

export const metadata = {
	title: 'Onara',
	description: 'Веб-приложение для администрирования репозиториев',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ru">
			<body>{children}</body>
		</html>
	);
}

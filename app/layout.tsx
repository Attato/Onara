import Header from '@/components/header/header';

import '@/styles/globals.scss';
import '@/styles/nullstyle.scss';
import '@/styles/variables.scss';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ru">
			<body>
				<div className="page_container">
					<Header />
					{children}
				</div>
			</body>
		</html>
	);
}

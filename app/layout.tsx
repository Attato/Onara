import Header from '@/components/common/header/header';
import Footer from '@/components/common/footer/footer';

import '@/styles/elements.scss';
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
					<Footer />
				</div>
			</body>
		</html>
	);
}

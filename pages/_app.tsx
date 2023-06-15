import React from 'react';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { usePathname } from 'next/navigation';

import '@/styles/import.scss';

const MyApp: NextPage<AppProps> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	const currentPath = usePathname();

	return (
		<div translate="no">
			<SessionProvider session={session}>
				<ThemeProvider enableSystem={true} attribute="class">
					{currentPath !== '/' && currentPath !== '/changelog' ? null : (
						<Header />
					)}
					<Component {...pageProps} />
					<Footer />
				</ThemeProvider>
			</SessionProvider>
		</div>
	);
};

export default appWithTranslation(MyApp);

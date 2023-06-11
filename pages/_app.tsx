import React from 'react';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/import.scss';

const MyApp: NextPage<AppProps> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<div translate="no">
			<SessionProvider session={session}>
				<ThemeProvider enableSystem={true} attribute="class">
					<Header />
					<Component {...pageProps} />
					<Footer />
				</ThemeProvider>
			</SessionProvider>
		</div>
	);
};

export default appWithTranslation(MyApp);

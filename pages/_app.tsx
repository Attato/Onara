import React from 'react';

import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { appWithTranslation } from 'next-i18next';

import '@/styles/import.scss';

console.info('Have a great day! 🌳🐇🌻');

const MyApp: NextPage<AppProps> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<div className="page_container" translate="no">
			<SessionProvider session={session}>
				<Header />
				<Component {...pageProps} />
				<Footer />
			</SessionProvider>
		</div>
	);
};

export default appWithTranslation(MyApp);

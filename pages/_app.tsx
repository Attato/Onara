import React from 'react';

import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { SessionProvider } from 'next-auth/react';

import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';

import '@/styles/import.scss';

console.info('Have a great day! 🌳🐇🌻');

export default function MyApp({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	return (
		<div className="page_container">
			<SessionProvider session={session}>
				<Header />
				<Component {...pageProps} />
				<Footer />
			</SessionProvider>
			<Analytics />
		</div>
	);
}

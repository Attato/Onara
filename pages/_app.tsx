import React from 'react';
import Header from '@/components/common/header/header';
import Footer from '@/components/common/footer/footer';

import '@/styles/elements.scss';
import '@/styles/globals.scss';
import '@/styles/nullstyle.scss';
import '@/styles/variables.scss';

import type { AppProps } from 'next/app';

console.info('Have a great day! 🌳🐇🌻');

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<div className="page_container">
			<Header />
			<Component {...pageProps} />
			<Footer />
		</div>
	);
}

import type { NextPage } from 'next';
import Image from 'next/image';

import styles from './page.module.scss';

const Home: NextPage = () => {
	return (
		<main className="main">
			<div className={styles.masthead}>
				<Image src="/logo.svg" width={264} height={54} alt="img"></Image>
				<Image src="/bg1.png" width={512} height={512} alt="img"></Image>
			</div>

			<div className={styles.empty} />
		</main>
	);
};

export default Home;

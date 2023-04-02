import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import styles from './page.module.scss';

const Home: NextPage = () => {
	return (
		<main className="main">
			<div className={styles.masthead}>
				<h1>IMAGINE A PLACE...</h1>
				<p>
					... where you and your friends can manage your project. A place where
					you can communicate, plan, vote and decide what your project will be
					like in the near future.
				</p>
			</div>

			<div className={styles.footer}>
				<Image
					src="/homePage_1.png"
					width={512}
					height={512}
					alt="img"
					className={styles.cosmonaut}
				/>
			</div>
		</main>
	);
};

export default Home;

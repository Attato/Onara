import type { NextPage } from 'next';
import Image from 'next/image';

import styles from './page.module.scss';

const Home: NextPage = () => {
	return (
		<main className="main">
			<div className={styles.masthead}>
				<h1>IMAGINE A PLACE...</h1>
				<p>... *text*</p>
				{/* <Image src="/logo.svg" width={264} height={54} alt="img" /> */}
			</div>

			<div className={styles.empty}>
				<Image
					src="/bg1.png"
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

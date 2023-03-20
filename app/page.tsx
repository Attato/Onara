import Image from 'next/image';

import styles from './page.module.scss';

export default function Home() {
	return (
		<main className="main">
			<div className={styles.masthead}>
				<Image src="/logo.svg" width={264} height={54} alt="img"></Image>
			</div>
		</main>
	);
}

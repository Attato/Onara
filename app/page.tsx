import Image from 'next/image';
import styles from './page.module.scss';

export default function Home() {
	return (
		<main className={styles.main}>
			<div className={styles.masthead}>
				<Image src="/logo.svg" width={524} height={104} alt="img"></Image>
			</div>
		</main>
	);
}

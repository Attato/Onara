import Image from 'next/image';
import styles from './stub.module.scss';

const Stub = () => {
	return (
		<div className={styles.stub}>
			<Image
				src="/components/stub/attention.svg"
				width={16}
				height={16}
				alt="attention"
			/>
			<p>This page is a stub. Help us expand it by contributing! </p>
		</div>
	);
};

export default Stub;

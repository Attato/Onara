import Image from 'next/image';

import styles from './index.module.scss';

interface AttentionProps {
	text: string;
}

const Attention = ({ text }: AttentionProps) => {
	return (
		<div className={styles.stub}>
			<Image
				src="/icons/attention.svg"
				width={16}
				height={16}
				alt="attention"
			/>
			<p>{text}</p>
		</div>
	);
};

export default Attention;

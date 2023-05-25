import styles from './index.module.scss';

type LoadingProps = {
	width?: number;
	height?: number;
	color?: string;
};

const Loading: React.FC<LoadingProps> = ({
	width = 24,
	height = 24,
	color = '#0082f5',
}) => {
	return (
		<div className={styles.spinner_container}>
			<div
				className={styles.spinner}
				style={{
					width: `${width}px`,
					height: `${height}px`,
					borderTopColor: `${color}`,
				}}
			></div>
		</div>
	);
};

export default Loading;

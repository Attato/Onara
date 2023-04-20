import styles from './loading.module.scss';

const Loading = ({ width, height }: any) => {
	return (
		<div className={styles.spinner_container}>
			<div
				className={styles.spinner}
				style={{ width: `${width}px`, height: `${height}px` }}
			></div>
		</div>
	);
};

export default Loading;

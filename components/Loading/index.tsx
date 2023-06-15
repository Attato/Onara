import styles from './index.module.scss';

type LoadingProps = {
	width?: number;
	height?: number;
};

const Loading: React.FC<LoadingProps> = ({ width = 24, height = 24 }) => {
	return (
		<div className="flex justify-center items-center">
			<div
				className={`${styles.spinner} border-[4px] border-surface100 dark:border-surface100Dark ronded-[50%] border-t-accent dark:border-t-accent`}
				style={{
					width: `${width}px`,
					height: `${height}px`,
				}}
			></div>
		</div>
	);
};

export default Loading;

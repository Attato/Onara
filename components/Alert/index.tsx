import IconWrapper from '../IconWrapper';
import styles from './index.module.scss';

export type AlertType = 'warning' | 'attention' | 'success' | null;

type AlertProps = {
	type?: AlertType;
	text?: string;
};

const Alert: React.FC<AlertProps> = ({
	type = 'attention',
	text = 'Alert without text',
}) => {
	const getIcon = () => {
		switch (type) {
			case 'warning':
				return (
					<IconWrapper width={24} height={24}>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
						/>
					</IconWrapper>
				);
			case 'attention':
				return (
					<IconWrapper width={24} height={24}>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
						/>
					</IconWrapper>
				);

			case 'success':
				return (
					<IconWrapper width={24} height={24}>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</IconWrapper>
				);

			default:
				return null;
		}
	};

	return (
		<div
			className={
				type === 'warning'
					? styles.warning
					: type === 'attention'
					? styles.attention
					: type === 'success'
					? styles.success
					: ''
			}
			id={styles.alert}
		>
			{getIcon()}
			<p>{text}</p>
		</div>
	);
};

export default Alert;

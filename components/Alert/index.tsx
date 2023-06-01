import {
	ExclamationCircleIcon,
	ExclamationTriangleIcon,
	CheckCircleIcon,
} from '@heroicons/react/24/outline';

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
				return <ExclamationCircleIcon width={24} height={24} />;
			case 'attention':
				return <ExclamationTriangleIcon width={24} height={24} />;
			case 'success':
				return <CheckCircleIcon width={24} height={24} />;

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

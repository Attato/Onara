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
			className={`
				${
					type === 'warning'
						? 'text-warning bg-warningBackground border border-warningBorder'
						: type === 'attention'
						? 'text-attention bg-attentionBackground border border-attentionBorder'
						: type === 'success'
						? 'text-success bg-successBackground border border-successBorder'
						: ''
				}
				flex items-center gap-2 px-4 py-3 rounded-lg text-background
			`}
		>
			{getIcon()}
			<p>{text}</p>
		</div>
	);
};

export default Alert;

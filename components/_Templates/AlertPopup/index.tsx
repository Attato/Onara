import Alert from '@/components/Alert';
import Popup from '@/components/Popup';

import type { AlertType } from '@/components/Alert';

interface AlertPopupProps {
	buttonContent?: React.ReactNode;
	title?: string;
	alertType?: AlertType;
	alertText?: string;
}

const AlertPopup: React.FC<AlertPopupProps> = ({
	buttonContent,
	title,
	alertType,
	alertText,
}) => {
	return (
		<Popup title={title} buttonContent={buttonContent}>
			<Alert type={alertType} text={alertText} />
		</Popup>
	);
};

export default AlertPopup;

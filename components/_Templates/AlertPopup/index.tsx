import Alert from '@/components/Alert';
import Popup from '@/components/Popup';

import type { AlertType } from '@/components/Alert';

interface AlertPopupProps {
	isPopupOpen: boolean;
	popupOnClose: () => void;
	title?: string;
	alertType?: AlertType;
	alertText?: string;
}

const AlertPopup: React.FC<AlertPopupProps> = ({
	isPopupOpen,
	popupOnClose,
	alertType,
	alertText,
	title,
}) => {
	return (
		<Popup isOpen={isPopupOpen} onClose={popupOnClose} title={title}>
			<Alert type={alertType} text={alertText} />
		</Popup>
	);
};

export default AlertPopup;

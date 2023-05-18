import Image from 'next/image';

import { signIn } from 'next-auth/react';

import Popup from '@/components/Popup';

import styles from './index.module.scss';

interface AuthorizationPopupProps {
	isPopupOpen: boolean;
	popupOnClose: () => void;
	title?: string;
}

const AuthorizationPopup: React.FC<AuthorizationPopupProps> = ({
	isPopupOpen,
	popupOnClose,
	title,
}) => {
	return (
		<Popup isOpen={isPopupOpen} onClose={popupOnClose} title={title}>
			<div className={styles.buttons}>
				<button onClick={() => signIn('github')} id={styles.github}>
					Continue with GitHub
					<Image
						src="/icons/services/github.svg"
						width={16}
						height={16}
						alt="github"
					/>
				</button>
				<button onClick={() => signIn('gitlab')} id={styles.gitlab}>
					Continue with GitLab
					<Image
						src="/icons/services/gitlab.svg"
						width={16}
						height={16}
						alt="gitlab"
					/>
				</button>
			</div>
		</Popup>
	);
};

export default AuthorizationPopup;

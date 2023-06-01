import React from 'react';

import Image from 'next/image';

import { signIn, useSession } from 'next-auth/react';

import { ArrowRightIcon } from '@heroicons/react/24/outline';

import Alert from '@/components/Alert';
import Popup from '@/components/Popup';

import styles from './index.module.scss';

interface AuthorizationPopupProps {
	buttonContent?: React.ReactNode;
	title?: string;
}

const AuthorizationPopup: React.FC<AuthorizationPopupProps> = ({
	title,
	buttonContent,
}) => {
	const { status } = useSession();

	return (
		<Popup title={title} buttonContent={buttonContent}>
			{status === 'unauthenticated' && (
				<div className={styles.buttons}>
					<button onClick={() => signIn('github')} id={styles.github}>
						<div className={styles.button_content}>
							Continue with GitHub
							<Image
								src="/icons/services/github.svg"
								width={16}
								height={16}
								alt="github"
							/>
						</div>
						<ArrowRightIcon width={16} height={16} strokeWidth={2} />
					</button>
					<button onClick={() => signIn('gitlab')} id={styles.gitlab}>
						<div className={styles.button_content}>
							Continue with GitLab
							<Image
								src="/icons/services/gitlab.svg"
								width={16}
								height={16}
								alt="gitlab"
							/>
						</div>
						<ArrowRightIcon width={16} height={16} strokeWidth={2} />
					</button>
				</div>
			)}

			{status === 'authenticated' && (
				<React.Fragment>
					<Alert text="You are already logged in!" />
					<div className={styles.buttons} style={{ marginTop: '12px' }}>
						<button
							onClick={() => signIn('github')}
							id={styles.github}
							disabled={true}
						>
							Continue with GitHub
						</button>
						<button
							onClick={() => signIn('gitlab')}
							id={styles.gitlab}
							disabled={true}
						>
							Continue with GitLab
						</button>
					</div>
				</React.Fragment>
			)}
		</Popup>
	);
};

export default AuthorizationPopup;

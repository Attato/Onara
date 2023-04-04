'use client';

import styles from './pageContent.module.scss';

const PageContent = ({ children }: { children: React.ReactNode }) => {
	return <div className={styles.page_content}>{children}</div>;
};

export default PageContent;

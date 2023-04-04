import Link from 'next/link';
import styles from './layout.module.scss';

const Layout = ({ children }: { children: React.ReactNode }) => (
	<main className="main">
		<div className={styles.slug}>
			<div className={styles.sidebar}>
				<Link href="/docs">Introduction</Link>
				<section>
					<Link href="/docs/get-started">Get started</Link>
					<div className={styles.links}>
						<Link href="/docs/get-started#step-1">Step 1 - *text*</Link>
						<Link href="/docs/get-started#step-2">Step 2 - *text*</Link>
						<Link href="/docs/get-started#step-3">Step 3 - *text*</Link>
						<Link href="/docs/get-started#step-4">Step 4 - *text*</Link>
						<Link href="/docs/get-started#step-5">Step 5 - *text*</Link>
					</div>
				</section>
				<Link href="/docs/guide">Guide</Link>
			</div>
			{children}
		</div>
	</main>
);

export default Layout;

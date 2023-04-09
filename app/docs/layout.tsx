'use client';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import styles from './layout.module.scss';

const Layout = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();

	const links = [
		{ href: '/docs', label: 'Introduction' },
		{ href: '/docs/installation-and-setup', label: 'Installation and Setup' },
		{ href: '/docs/user-guide', label: 'User Guide' },
		{ href: '/docs/api', label: 'API Documentation' },
		{ href: '/docs/configuration', label: 'Configuration' },
		{ href: '/docs/troubleshooting-faqs', label: 'Troubleshooting and FAQs' },
		{ href: '/docs/security', label: 'Security' },
		{
			href: '/docs/performance-scalability',
			label: 'Performance and Scalability',
		},
		{ href: '/docs/error-handling', label: 'Error Handling' },
		{
			href: '/docs/customization-extensibility',
			label: 'Customization and Extensibility',
		},
		{ href: '/docs/release-notes', label: 'Release Notes' },
		{ href: '/docs/code-samples-examples', label: 'Code Samples and Examples' },
		{
			href: '/docs/dependencies-libraries',
			label: 'Dependencies and Third-party Libraries',
		},
		{ href: '/docs/contact-support', label: 'Contact Information and Support' },
		{ href: '/docs/glossary', label: 'Glossary' },
		{ href: '/docs/legal-licensing', label: 'Legal and Licensing Information' },
		{
			href: '/docs/version-control-collaboration',
			label: 'Version Control and Collaboration',
		},
		{
			href: '/docs/backups-disaster-recovery',
			label: 'Backups and Disaster Recovery',
		},
		{
			href: '/docs/testing-quality-assurance',
			label: 'Testing and Quality Assurance',
		},
	];

	return (
		<main className="main">
			<div className={styles.slug}>
				<div className={styles.sidebar}>
					{links.map((link, index) => {
						const isActive = pathname === link.href;
						return (
							<Link
								href={link.href}
								key={index}
								className={isActive ? styles.activeLink : ''}
							>
								{link.label}
							</Link>
						);
					})}
				</div>
				{children}
			</div>
		</main>
	);
};

export default Layout;

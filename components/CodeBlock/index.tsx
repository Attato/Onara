import React, { useState } from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { DocumentIcon, DocumentCheckIcon } from '@heroicons/react/24/outline';
import styles from './index.module.scss';

type CodeBlockProps = {
	language?: string;
	code?: string;
	showLineNumbers?: boolean;
};

const CodeBlock: React.FC<CodeBlockProps> = ({
	language = 'md',
	code = 'Codeblock without text.',
	showLineNumbers = true,
}) => {
	const [copySuccess, setCopySuccess] = useState(false);

	const copyToClipboard = () => {
		navigator.clipboard.writeText(code);
		setCopySuccess(true);
		setTimeout(() => setCopySuccess(false), 1500);
	};

	return (
		<React.Fragment>
			<div className={styles.codeblock_toolbar}>
				{language}
				<button className={styles.codeblock_copy_btn} onClick={copyToClipboard}>
					{copySuccess ? (
						<div>
							Copied!
							<DocumentCheckIcon width={14} height={14} />
						</div>
					) : (
						<div>
							Copy code
							<DocumentIcon width={14} height={14} />
						</div>
					)}
				</button>
			</div>

			<SyntaxHighlighter
				language={language}
				style={oneDark}
				showLineNumbers={showLineNumbers}
			>
				{code}
			</SyntaxHighlighter>
		</React.Fragment>
	);
};

export default CodeBlock;

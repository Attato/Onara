import React, { useState } from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import IconWrapper from '@/components/IconWrapper';

import styles from './index.module.scss';

type CodeBlockProps = {
	language?: string;
	code?: string;
};

const CodeBlock: React.FC<CodeBlockProps> = ({
	language = 'md',
	code = 'The majestic empty block of code is a lonely relic in the bottomless vastness of programming, resembling a forgotten and lost underground temple. Like a magnificent obelisk, it stretches to the heights of heaven, surrounded by dense shadows, as if dark secrets and forgotten magic spells are hidden inside it. Huge symbols and mystical comments engraved on the surface of the block illustrate the eternal battle between the programmer and errors, between light and darkness. The code symbols, like ancient runes, seal the power inside this magical space waiting to be filled with new instructions.',
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
							<IconWrapper width={14} height={14}>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
								/>
							</IconWrapper>
						</div>
					) : (
						<div>
							Copy code
							<IconWrapper width={14} height={14}>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
								/>
							</IconWrapper>
						</div>
					)}
				</button>
			</div>

			<SyntaxHighlighter
				language={language}
				style={oneDark}
				showLineNumbers={true}
			>
				{code}
			</SyntaxHighlighter>
		</React.Fragment>
	);
};

export default CodeBlock;

import React from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import styles from './index.module.scss';

type CodeBlockProps = {
	language: string;
	value: string;
};

const CodeBlock = ({ language, value }: CodeBlockProps) => {
	return (
		<SyntaxHighlighter language={language} style={vscDarkPlus} wrapLines={true}>
			{value}
		</SyntaxHighlighter>
	);
};

export default CodeBlock;

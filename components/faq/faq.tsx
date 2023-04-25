import { useState } from 'react';

import Image from 'next/image';

import styles from './faq.module.scss';

interface Question {
	question: string;
	answer: string;
}

interface Props {
	questions: Question[];
}

const FAQ = ({ questions }: Props) => {
	const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

	const handleClick = (index: number) => {
		if (activeQuestion === index) {
			setActiveQuestion(null);
		} else {
			setActiveQuestion(index);
		}
	};

	return (
		<>
			{questions.map((item, index) => (
				<div className={styles.faq} key={index}>
					<button onClick={() => handleClick(index)}>
						<Image
							src="/icons/arrow_down.svg"
							width={12}
							height={8}
							alt="arrow_down"
							className={
								activeQuestion === index ? styles.arrow_rotate : styles.arrow
							}
						/>
						<h3
							style={
								activeQuestion === index ? { opacity: 1 } : { opacity: 0.6 }
							}
						>
							{item.question}
						</h3>
					</button>
					{activeQuestion === index && (
						<div className={styles.faq_content}>
							<p>{item.answer}</p>
						</div>
					)}
				</div>
			))}
		</>
	);
};

export default FAQ;

import { useState } from 'react';

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
						<span className={styles.simbol}>
							{activeQuestion === index ? '-' : '+'}
						</span>
						<h3>{item.question}</h3>
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

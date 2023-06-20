import { CheckIcon } from '@heroicons/react/24/outline';

import styles from './index.module.scss';

interface CheckBoxProps {
	checked?: boolean;
	readOnly?: boolean;
}

const CheckBox: React.FC<CheckBoxProps> = ({
	checked = false,
	readOnly = false,
}) => {
	return (
		<div className="flex items-center">
			<input
				type="checkbox"
				id="A3-yes"
				name="A3-confirmation"
				value="yes"
				checked={checked}
				readOnly={readOnly}
				className={`${styles.input} opacity-0 absolute h-4 w-4 cursor-pointer`}
			/>
			<div className="bg-white border-2 rounded-[4px] border-indigo-500 h-4 w-4 flex flex-shrink-0 justify-center items-center focus-within:border-indigo-600 ">
				<CheckIcon className="hidden text-colorPrimaryDark " strokeWidth={3} />
			</div>
		</div>
	);
};

export default CheckBox;

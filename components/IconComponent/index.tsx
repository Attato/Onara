//
// I created this component because currentСolor doesn't work with next/image.

import { ReactNode } from 'react';

type IconComponentProps = {
	width?: number;
	height?: number;
	strokeWidth?: number;
	children: ReactNode;
};

const IconComponent = ({
	width = 16,
	height = 16,
	strokeWidth = 2,
	children,
}: IconComponentProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={strokeWidth}
			stroke="currentColor"
			width={width}
			height={height}
		>
			{children}
		</svg>
	);
};
export default IconComponent;

//
// I created this component because currentСolor doesn't work with next/image.

type IconWrapperProps = {
	width?: number;
	height?: number;
	strokeWidth?: number;
	fill?: string;
	children: React.ReactNode;
};

const IconWrapper: React.FC<IconWrapperProps> = ({
	width = 16,
	height = 16,
	strokeWidth = 2,
	fill = 'none',
	children,
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill={fill}
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
export default IconWrapper;

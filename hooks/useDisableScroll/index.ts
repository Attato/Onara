import { useEffect } from 'react';

const useDisableScroll = (open: boolean) => {
	useEffect(() => {
		const handleDisableScroll = () => {
			if (open) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = 'auto';
			}
		};

		handleDisableScroll();

		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [open]);
};

export default useDisableScroll;

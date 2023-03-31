import { useCallback } from 'react';

const useScrollToTop = () => {
	const handleClick = useCallback(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, []);

	return handleClick;
};

export default useScrollToTop;

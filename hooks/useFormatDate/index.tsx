export const useFormatDate = (dateString: string): string => {
	const date = new Date(dateString);
	const day = date.getUTCDate().toString();
	const month = date.toLocaleString('en-US', { month: 'short' });
	const year = date.getUTCFullYear().toString();

	return `${day} ${month} ${year}`;
};

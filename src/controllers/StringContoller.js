class StringController {
	static truncateString = (str, maxStrLength) => {
		if (str.length > maxStrLength) {
			let subStr = str.substring(0, maxStrLength);
			return subStr + '...';
		} else {
			return str;
		}
	};
}

export default StringController;

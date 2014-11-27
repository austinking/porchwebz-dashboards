module.exports = function(period, now) {
    return new Date(now.getTime() - periodToDistance(period));
}

function periodToDistance(period) {
	if (period === 'quarterly') {
		//     mill   sec  min  hour days months
		return 1000 * 60 * 60 * 24 * 30 * 3;
	} if (period === 'monthly') {
		//     mill   sec  min  hour days
		return 1000 * 60 * 60 * 24 * 30;
	} if (period === 'weekly') {
		//     mill   sec  min  hour days
		return 1000 * 60 * 60 * 24 * 7;
	} if (period === 'daily') {
		//     mill   sec  min  hours
		return 1000 * 60 * 60 * 24;
	} else {
		throw new Error('Unsupported period: [' + period + ']');
	}
}
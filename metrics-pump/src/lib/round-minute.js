module.exports = function() {
	var now = new Date();
	var granulatity = 1000 * 60;
	return new Date(Math.round(new Date().getTime() / granulatity) * granulatity);
}
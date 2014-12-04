/**
 * An Example plugin which does a random walk
 */

var pos = 0;

module.exports = {
	period: 'daily',
    interval: 'minute',
    dashboards: ['welcome'],
	calculate: function(fromDate, toDate, cb) {
		console.log('random-walk.calcuate', arguments);        
		var val = pos + (Math.random() * 10) - 5;
		pos += val;
        cb(null, val);
    }
};
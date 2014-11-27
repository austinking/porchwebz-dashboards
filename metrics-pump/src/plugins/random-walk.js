/**
 * An Example plugin which does a random walk
 */

var pos = 0;

module.exports = {
	period: 'monthly',
    interval: 'daily',
    dashboards: ['http://dashboards.porchwebz.com/pro'],
	calculate: function(fromDate, toDate, cb) {        
		var val = pos + (Math.random() * 10) - 5;
        cb(null, val);
    }
};
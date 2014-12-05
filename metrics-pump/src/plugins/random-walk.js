var fs = require('fs');

/**
 * An Example plugin which does a random walk
 */

var pos = 0;

const STATE_FILE = 'random-walk.data';

fs.readFile(STATE_FILE, {encoding: 'utf8'}, function (err, data) {
  if (!err) pos = parseFloat(data);
});

module.exports = {
	period: 'daily',
    interval: 'minute',
    dashboards: ['random-walk'],
	calculate: function(fromDate, toDate, cb) {
		var val = (Math.random() * 6) - 3;
		pos += val;		
        cb(null, val);
        fs.writeFile(STATE_FILE, "" + pos, function(err) { console.log(err); });
    }
};
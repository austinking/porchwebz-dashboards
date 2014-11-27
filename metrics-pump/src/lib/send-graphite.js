var net = require('net');

// TODO pull out into configs
const graphite = {
	port: 2003,
	host: '192.168.59.103'
}

module.exports = function(metricName, interval, value, time, cb) {
	time = typeof time === 'object' ? Math.round(time.getTime() / 1000) : time;

	var fullMetricName = 'dashboards.' +  interval + '.' + metricName;

    var client = net.connect(graphite, function() {
    	client.write(fullMetricName + ' ' + value + ' ' + time + '\n');
    	client.end();
    });
    client.on('end', cb);
}
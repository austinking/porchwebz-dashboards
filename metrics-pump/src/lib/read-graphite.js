var http = require('http');

var _ = require('underscore');

// TODO pull out into configs
const graphite = {
	protocol: 'http',
	port: 2003,
	webPort: 8080,
	host: '192.168.59.103'
}

var graphiteUrl;
with (graphite) {
	graphiteUrl = [protocol, '://', host, ':', webPort].join('');
}


module.exports = function(metricName, interval, time, cb) {
	time = typeof time === 'object' ? Math.round(time.getTime() / 1000) : time;

	var fullMetricName = 'dashboards.' +  interval + '.' + metricName;

	var url = [
		graphiteUrl,
		'/render/?target=',
		fullMetricName,
		'&rawData=true'
	].join('');

    http.get(url, function(res) {
        var buf = "";
    	res.on('data', function(data) {
    		buf += new Buffer(data, 'utf8').toString();    		
    	});
    	res.on('end', function() {
    		cb(null, parseResponse(buf));
    	});
    }).on('error', function(err) {
    	cb(err);
	});

	function parseResponse(py) {
        var parts = py.split(',');        
        return _.map(parts, function(val) {
        	var v = val.trim();
            if (v === 'None') {
            	return null;
            } else if (v.indexOf('.') === -1) {
            	return parseInt(v, 10);
            } else {
            	return parseFloat(v);
            }
        });
	}
};
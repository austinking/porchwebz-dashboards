/**
 * TODO: This should use request or node's low level http library
 * The Dashing.io server is giving me 500s when I try to use request
 * so shelling out to curl for now.
 */
var spawn = require('child_process').spawn;

const dashing = {
	protocol: 'http',	
	port: 3030,
	hostname: '192.168.59.103',
	authToken: 'YOUR_AUTH_TOKEN'
};

module.exports = function (widgetName, payload) {
    payload['auth_token'] = dashing.authToken;
    var url;
    with (dashing) {
    	url = [protocol, '://', hostname, ':', port, '/widgets/', widgetName].join('');    
    }

    console.log('curl', '-d', JSON.stringify(payload), url);
    spawn('curl', ['-d', JSON.stringify(payload), url]);
};
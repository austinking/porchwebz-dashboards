#!/usr/bin/env node
/**
 * This cronjob is run every minute and signals the webserver running
 * in metrics_pump that it should generate metrics
 */
var fs = require('fs');
var path = require('path');

var roundMinute = require('../lib/round-minute');
var readGraphite = require('../lib/read-graphite');
var sendToDashboard = require('../lib/send-dashing');
var shouldPluginRun = require('../lib/should-plugin-run');
var subtractPeriod = require('../lib/subtract-period');
var readFromGraphite = require('../lib/read-graphite');
var sendToGraphite = require('../lib/send-graphite');

 // TODO: Plumbing to find modules
var plugins = [
  [
      'random-walk',
      path.join(__dirname, '..', 'plugins/random-walk.js')
  ]
];

console.log('================ do it ===============');

plugins.forEach(function(pluginPath) {
	var pluginName= pluginPath[0];
	var plugin = require(pluginPath[1]);
	var now = roundMinute();
	
    console.log('processing ', pluginName, now.getTime() / 1000);
        
    if (true || shouldPluginRun(plugin, now)) {

    	readGraphite(pluginName, plugin.interval, now, function(err, oldData) {
        
	        console.log('read from graphite!', err, JSON.stringify(oldData));

	        // BUG: last value could be null and for our current timestamp
	        var prev = oldData[oldData.length - 2];        

			var then = subtractPeriod(plugin.period, now);

			plugin.calculate(then, now, function(err, val) {
				if (err) {
					return;
				}
				console.log("publishing ", val);
				sendToGraphite(pluginName, plugin.interval, val, now, function(err) {
					if (err) {
						// send to statsd
						return console.log(err);
					}
					// Only update the dashboard on success
					plugin.dashboards.forEach(function(widgetName) {

						sendToDashboard(widgetName, {
							text: 'Boo ya @' + val
						});
					});
				});
			});
		});
	} else {
		console.log('Skipping', pluginName);
	}

   // TODO plugins.dashboards.forEach(request POST)		
		// * read recent data from graphite
		// * compute dashboard values
		// * post over to the dashboard
		// * trigger backfill?
		// TODO can our VM see the graphite VM?
	
});
// 1417065435056
// 1417065070392
// 1417065070
// 1416979140
// 1417065540

/*
for (var i=0; i < 50; i++) {
	var aTime = Math.round(new Date().getTime() / 1000) - Math.round(Math.random() * 10000);
	console.log('Sending', aTime);

	sendToGraphite('hobo-time', 'hourly', Math.random()* 100, aTime, function() {
	    console.log('boo ya');
	});	

	sendToGraphite('hobo-test', 'minute', Math.random()* 100, aTime, function() {
	    console.log('boo ya');
	    readFromGraphite('hobo-test', 'minute', aTime, function(err, values) {
	    	console.log(err, values);
	    })
	});	
}
*/

function recordMetrics(plugin) {
	return function(err, metric) {
		if (err) {
			console.log(plugin, err);
			return;
		}		
	}
}
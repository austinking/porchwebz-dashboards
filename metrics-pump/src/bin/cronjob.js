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

plugins.forEach(function(pluginPath) {
	var pluginName= pluginPath[0];
	var plugin = require(pluginPath[1]);
	var now = roundMinute();
        
    if (true || shouldPluginRun(plugin, now)) {

    	readGraphite(pluginName, plugin.interval, now, function(err, oldData) {       
	        // BUG: last value could be null and for our current timestamp
	        var prev = oldData[oldData.length - 2];        
	        var last = prev || 'Nil';

			var then = subtractPeriod(plugin.period, now);

			plugin.calculate(then, now, function(err, val) {
				if (err) {
					return;
				}				
				sendToGraphite(pluginName, plugin.interval, val, now, function(err) {
					if (err) {
						// send to statsd
						return console.log(err);
					}
					// Only update the dashboard on success
					plugin.dashboards.forEach(function(widgetName) {
						sendToDashboard(widgetName, {
							title: 'Random Walk',
							current: Math.round(val),
							last: last,
							moreinfo: 'A random value every minute.'					
						});
					});
				});
			});
		});
	} else {
		console.log('Skipping', pluginName);
	}

// * read recent data from graphite
// * trigger backfill?
// * dashing.io cold start -> url that causes udpates to be posted back
	
});

function recordMetrics(plugin) {
	return function(err, metric) {
		if (err) {
			console.log(plugin, err);
			return;
		}		
	}
}
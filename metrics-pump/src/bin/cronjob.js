#!/usr/bin/env node
/**
 * This cronjob is run every minute and signals the webserver running
 * in metrics_pump that it should generate metrics
 */
var fs = require('fs');
var path = require('path');

var roundMinute = require('../lib/round-minute');
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
	
	if (shouldPluginRun(plugin, now)) {
		var then = subtractPeriod(plugin.period, now);
		plugin(then, now, function(err, val) {
			if (err) {
				return;
			}
			sendToGraphite(pluginName, plugin.interval, val, now, function() {

			});
		});
	}
});
// 1417065435056
// 1417065070392
// 1417065070
// 1416979140
// 1417065540

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


function recordMetrics(plugin) {
	return function(err, metric) {
		if (err) {
			console.log(plugin, err);
			return;
		}
		// TODO plugins.dashboards.forEach(request POST)		
		// * read recent data from graphite
		// * compute dashboard values
		// * post over to the dashboard
		// * trigger backfill?
		// TODO can our VM see the graphite VM?

	}
}
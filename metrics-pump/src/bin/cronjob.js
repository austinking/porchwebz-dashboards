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

 // TODO: Plumbing to find modules
var plugins = [
  path.join(__dirname, '..', 'plugins/random-walk.js')
];

plugins.forEach(function(pluginPath) {
	var plugin = require(pluginPath);
	var now = roundMinute();
	
	if (shouldPluginRun(plugin, now)) {
		var then = subtractPeriod(plugin.period, now);
		plugin(then, now, recordMetrics(plugin));
	}
});

function recordMetrics(plugin) {
	return function(err, metric) {
		if (err) {
			console.log(plugin, err);
			return;
		}
		//TODO plugins.dashboards.forEach(request POST)
	}
}
#!/usr/bin/env node
/**
 * This cronjob is run every minute and signals the webserver running
 * in metrics_pump that it should generate metrics
 */
var fs = require('fs');
var path = require('path');

var async = require('async');

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

// TODO / Ideas
// * trigger backfill?
// * dashing.io cold start -> url that causes udpates to be posted back
// BUG: last value could be null and for our current timestamp

async.eachLimit(plugins, 3, function(pluginPath, pluginCb) {
    var pluginName= pluginPath[0];
    var plugin = require(pluginPath[1]);
    var now = roundMinute();
    var last, val;
        
    if (false || shouldPluginRun(plugin, now) === false) {
        console.log('Skipping', pluginName);
        return;
    }
    async.waterfall([
        function(cb) {
            readGraphite(pluginName, plugin.interval, now, cb);
        },
        function(oldData, cb) {                            
            var prev = oldData[oldData.length - 2];        
            var then = subtractPeriod(plugin.period, now);
            last = prev || 'Nil';
            plugin.calculate(then, now, cb);
        },
        function(aVal, cb) {
            console.log('aVal=', aVal);
            val = aVal;
            sendToGraphite(pluginName, plugin.interval, val, now, cb);
        },
        function(cb) {
            console.log('aVal=', val);
            async.eachSeries(plugin.dashboards, function(widgetName) {
                sendToDashboard(widgetName, {
                    title: 'Random Walk',
                    current: Math.round(val),
                    last: last,
                    moreinfo: 'A random value every minute.'                    
                });
            }, cb);
        }],
        function(err) {
            reportErrors(err);
            pluginCb();
        });
}, reportErrors);

function reportErrors(err) {
    if (err) {
        console.log(err);
    }
}
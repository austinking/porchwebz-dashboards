#!/usr/bin/env node
/**
 * This cronjob is run every minute and signals the webserver running
 * in metrics_pump that it should generate metrics
 */
console.log(new Date().toString());
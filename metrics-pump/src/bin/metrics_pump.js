#!/usr/bin/env node
/**
 * Main entry point into the framework that hosts NodeJs modules
 * which load metrics and publish them on various dashing.io Dashboards.
 *
 * This program does the following:
 * - starts up a webserver
 * - starts up a database
 * - runs metrics plugins
 * - pumps data over to dashboards
 */
var setupDb = require('../lib/setup_db');

setupDb();
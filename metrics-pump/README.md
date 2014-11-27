# Metrics Pump

Data can get onto a dashing dashboard in one of two ways:

* Using dashing.io's built in Ruby jobs
* Writing a NodeJS module under this `metrics-pump` directory

A metrics pump is typically a piece of code that calculates the value of a
KPI during a certain period of time. This metric is updated once per day.

Example: Organic search in the last 30 days

## API

// ga-organic.js
module.exports = {
	period: 'monthly',
    interval: 'daily',
    dashboards: ['http://dashboards.porchwebz.com/pro/ga-organic'],
	calculate: function(fromDate, toDate, cb) {
        ...
        cb(null, 42);
    }
};

The filename is important and becomes the name of the metric.

If errors are encountered, or if you cannot calculate metrics for the period given,
the first argument to the callback is an error. Example:

    calculate: function(fromDate, toDate, cb) {
        if (before45days(fromDate)) {
            return cb(new Error('No Data before 45 days, unable to service fromDate=' + fromDate.toString());	
        }
    }

When your NodeJs module is run, your code should calculate the total number of organic searches
conducted between now and 30 days ago. It would actually be called twice... another call
would have different fromDate and toDate to figure out the total number of organic searches
conducted between 30 days ago and 60 days ago.

The metrics pump plugin will do the following:
* Manage when your code gets called
* Calculate the difference between windows
* Provide human friendly output (down 3% since last Monday)
* Provide the dashboard with historical trend data

## Periods

How large of a window is used to calculate the current metric?

A metric window can be any of the following:

* Daily (24 hours) (Example: 3 % increase since Monday)
* Weekly (7 days) (Example: 3% increase since last Tuesday)
* Monthly (30 days) (Example: 3% increase since Nov)
* Quarterly (Example: 3% increase since July)

## Intervals

How frequently is the metric re-calculated

* daily (runs at 4am)
* hourly
* minute

## Development

### Running Development
    ./development-server.sh

### Bash shell

    docker exec -it metrics-pump bash

## Design

A cronjob triggers modules to run.

[ ] Previously failed metrics are retried. State is stored in the DB.


## Graphite

[Graphite](https://registry.hub.docker.com/u/hopsoft/graphite-statsd/) is used for storing quickly graphing data.

Metrics are prefixed with `dashboard.{interval}.{plugin-name}`.

1 minute for 2 hours (120 points)
10 minutes for 2 weeks (2016 points)


1 minute for 30 days (43,200 points)
15 minute for 10 years
4 * 24 * 365 * 10 (350,000 points)


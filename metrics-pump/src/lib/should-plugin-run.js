// Run daily jobs at 4am
const DAILY_HOURS = 4;
const DAILY_MINUTES = 0;

const HOURLY_MINUTES = 0;

module.exports = function(plugin, now) {    
    var interval = plugin.interval;
    var targetDt = new Date(now);

    if (interval === 'daily') {    	
    	targetDt.setHours(DAILY_HOURS);
    	targetDt.setMinutes(DAILY_MINUTES);
    	
    	if (now.getTime() == targetDt.getTime()) {    		
    		return true;
    	}
    } else if (interval === 'hourly') {
    	targetDt.setMinutes(HOURLY_MINUTES);
    	if (now.getTime() == targetDt.getTime()) {
    		return true;
    	}
    } else if (interval === 'minute') {
    	return true;
    } else {
    	throw new Error('Unknown plugin interval: [' + interval + ']');
    }
    return false;
};
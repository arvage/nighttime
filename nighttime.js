module.exports = function(RED) {
    "use strict";
    var SunCalc = require('suncalc');

    function NightTimeNode(n) {
        RED.nodes.createNode(this,n);
	this.lat = n.lat;
	this.lon = n.lon;
        this.start = n.start;
	this.end = n.end;

	var node = this;
	var oldval = null;

	var tick = function() {
    	    var times = SunCalc.getTimes(new Date(), n.lat, n.lon);
    	    var sunriseStr = times.sunrise.getHours() + ':' + times.sunrise.getMinutes();
    	    var sunsetStr = times.sunset.getHours() + ':' + times.sunset.getMinutes();
    	    var currenttime = new Date().getHours() + ':' + new Date().getMinutes();
    	    var globalContext = node.context().global;
		if ( currenttime < sunsetStr && currenttime > sunriseStr) {
		    globalContext.set("isNight",false);
		    node.status({fill:"yellow",shape:"dot",text:"Day"});
		    msg.topic = "isNight";
		    msg.payload = false;
        	}
            	if (currenttime > sunsetStr && currenttime < sunriseStr ) {
		    globalContext.set("isNight",true);
		    node.status({fill:"blue",shape:"dot",text:"Night"});
		    msg.topic = "isNight";
		    msg.payload = true;
		}
        }
	this.tick = setInterval(function() { tick(); }, 60000);
        this.tock = setTimeout(function() { tick(); }, 500);

        this.on("close", function() {
            if (this.tock) { clearTimeout(this.tock); }
            if (this.tick) { clearInterval(this.tick); }
        });
    }
    RED.nodes.registerType("nighttime",NightTimeNode);
};
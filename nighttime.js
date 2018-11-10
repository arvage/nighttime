
module.exports = function(RED) {
    "use strict";
    var SunCalc = require('suncalc');

    function assignmentFunction(node, lat, lon, callback) {
        if (90 >= lat && 180 >= lon && lat >= -90 && lon >= -180) {
            node.lat = lat;
            node.lon = lon;
        } else {
            return callback(RED._("nighttime.error.invalid-lat_lon"));
        }
        callback();
    }

        if (node.lat && node.lon) {
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
            //callback();
            }
            else {
            callback(RED._("nighttime.error.invalid-lat_lon"));
        }

    function NightTimeNode(n) {
        RED.nodes.createNode(this, n);
        var node = this;
        this.repeat = 60000;
        this.interval_id = null;
        this.interval_id = setInterval( function() {
            node.emit("input",{});
        }, this.repeat );

        this.on('input', function(msg) {
            assignmentFunction(node, n.lat, n.lon, RED.nodes.getNode(n.nighttime), function(err) {
                if (err) {
                    node.error(err,msg);
                } else {                        
                        //var msgString = JSON.stringify(msg.payload);
//                            if (msgString !== previousdata) {
//                                previousdata = msgString;
                        node.send(msg);
//                            }
                    
                }
            });
        });

        this.on("close", function() {
            if (this.interval_id !== null) {
                clearInterval(this.interval_id);
            }
        });
        node.emit("input",{});
    }

    RED.nodes.registerType("nighttime",NightTimeNode);
};

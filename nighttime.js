module.exports = function(RED) {
    "use strict";
    var SunCalc = require('suncalc');

    function SunNode(n) {
        RED.nodes.createNode(this,n);
        this.lat = n.lat;
        this.lon = n.lon;
        this.start = n.start;
        this.end = n.end;

        var node = this;
        var oldval = null;

        var tick = function() {
            var now = new Date();
            var times = SunCalc.getTimes(now, node.lat, node.lon);
            var nauticalDawnStr = times.nauticalDawn.getHours() + ':' + times.nauticalDawn.getMinutes();
            var dawnStr = times.dawn.getHours() + ':' + times.dawn.getMinutes();
            var sunriseStr = times.sunrise.getHours() + ':' + times.sunrise.getMinutes();
            var sunriseEndStr = times.sunriseEnd.getHours() + ':' + times.sunriseEnd.getMinutes();
            var goldenHourEndStr = times.goldenHourEnd.getHours() + ':' + times.goldenHourEnd.getMinutes();

            var goldenHourStr = times.goldenHour.getHours() + ':' + times.goldenHour.getMinutes();
            var sunsetStartStr = times.sunsetStart.getHours() + ':' + times.sunsetStart.getMinutes();
            var sunsetStr = times.sunset.getHours() + ':' + times.sunset.getMinutes();
            var duskStr = times.dusk.getHours() + ':' + times.dusk.getMinutes();
            var nauticalDuskStr = times.nauticalDusk.getHours() + ':' + times.nauticalDusk.getMinutes();
            var nightStr = times.night.getHours() + ':' + times.night.getMinutes();
            var nowMillis = Date.UTC(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate(),now.getUTCHours(),now.getUTCMinutes());
            var startMillis = Date.UTC(times[node.start].getUTCFullYear(),times[node.start].getUTCMonth(),times[node.start].getUTCDate(),times[node.start].getUTCHours(),times[node.start].getUTCMinutes());
            var endMillis = Date.UTC(times[node.end].getUTCFullYear(),times[node.end].getUTCMonth(),times[node.end].getUTCDate(),times[node.end].getUTCHours(),times[node.end].getUTCMinutes());
            var e1 = nowMillis - startMillis;
            var e2 = nowMillis - endMillis;
            var globalContext = node.context().global;
            if (isNaN(e1)) { e1 = 1; }
            if (isNaN(e2)) { e2 = -1; }
            var msg = {payload:true, topic:"isNight", 
            nauticalDawn:nauticalDawnStr,
            dawn:dawnStr,
            sunrise:sunriseStr,
            sunriseEnd:sunriseEndStr,
            goldenHourEnd:goldenHourEndStr,
            goldenHour:goldenHourStr,
            sunsetStart:sunsetStartStr,
            sunset:sunsetStr,
            dusk:duskStr,
            nauticalDusk:nauticalDuskStr,
            night:nightStr
         };
            if ((e1 > 0) & (e2 < 0)) { msg.payload = false}
            if (oldval == null) { oldval = msg.payload; }
            if (msg.payload == true) { 
                node.status({fill:"blue",shape:"dot",text:"Night"}); 
                globalContext.set("isNight",true);
            }
            else { 
                node.status({fill:"yellow",shape:"dot",text:"Day"}); 
                globalContext.set("isNight",false);
            }
            if (msg.payload != oldval) {
                oldval = msg.payload;
                node.send([msg,msg]);
            }
            else { node.send(msg); }
        }

        this.tick = setInterval(function() { tick(); }, 60000);
        this.tock = setTimeout(function() { tick(); }, 500);

        this.on("close", function() {
            if (this.tock) { clearTimeout(this.tock); }
            if (this.tick) { clearInterval(this.tick); }
        });
    }
    RED.nodes.registerType("nighttime",SunNode);
};
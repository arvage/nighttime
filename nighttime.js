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
            var nowMillis = Date.UTC(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate(),now.getUTCHours(),now.getUTCMinutes());
            var startMillis = Date.UTC(times[node.start].getUTCFullYear(),times[node.start].getUTCMonth(),times[node.start].getUTCDate(),times[node.start].getUTCHours(),times[node.start].getUTCMinutes());
            var endMillis = Date.UTC(times[node.end].getUTCFullYear(),times[node.end].getUTCMonth(),times[node.end].getUTCDate(),times[node.end].getUTCHours(),times[node.end].getUTCMinutes());
            var e1 = nowMillis - startMillis;
            var e2 = nowMillis - endMillis;
            var globalContext = node.context().global;
            if (isNaN(e1)) { e1 = 1; }
            if (isNaN(e2)) { e2 = -1; }
            var moon = parseInt(SunCalc.getMoonIllumination(now).fraction * 100 + 0.5) / 100;
            var msg = {payload:true, topic:"isNight"};
            if ((e1 > 0) & (e2 < 0)) { msg.payload = false; }
            if (oldval == null) { oldval = msg.payload; }
            if (msg.payload == true) { 
                node.status({fill:"yellow",shape:"dot",text:"Night"}); 
                globalContext.set("isNight",true);
            }
            else { 
                node.status({fill:"blue",shape:"dot",text:"Day"}); 
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
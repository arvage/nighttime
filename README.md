A simple node indicating if it's day or night.

The node sets: <code>msg.payload</code> to boolean <code>true</code> or <code>false</code> payloads..it also sets a global <code>isNight</code> accessible in all flows.

it sends a <code>true</code> payload if it is dark and <code>false</code> if not dark.

The second output emits only on the transition between night to day or day to night.

Here are use-case examples:
```json
[{"id":"d679cbec.b156b8","type":"function","z":"b365304f.a85de","name":"Check if isNight is true","func":"var isNight = global.get(\"isNight\");\nif (isNight === true)\n{\n    //do something\n    //e.g turn on christmas tree lights\n}\nif (isNight === false)\n{\n    //do something\n    //e.g turn off all lights\n}\n// you can use this function anywhere \n// without using multiple nighttime nodes\n// just have the inject trigger this function","outputs":1,"noerr":0,"x":500,"y":280,"wires":[[]]},{"id":"26b1bd5b.2216a2","type":"ui_switch","z":"b365304f.a85de","name":"","label":"Christmas Lights","group":"fe8c1b89.b8c8f8","order":0,"width":0,"height":0,"passthru":false,"decouple":"true","topic":"","style":"","onvalue":"true","onvalueType":"bool","onicon":"","oncolor":"","offvalue":"false","offvalueType":"bool","officon":"","offcolor":"","x":450,"y":140,"wires":[[]]},{"id":"973c907.80f1f7","type":"nighttime","z":"b365304f.a85de","name":"Home","lon":"-117.66053","lat":"33.56086","start":"goldenHourEnd","end":"goldenHour","x":210,"y":140,"wires":[["26b1bd5b.2216a2"],[]]},{"id":"cb23da59.3a1d28","type":"inject","z":"b365304f.a85de","name":"","topic":"","payload":"","payloadType":"date","repeat":"60","crontab":"","once":false,"onceDelay":0.1,"x":230,"y":280,"wires":[["d679cbec.b156b8"]]},{"id":"fe8c1b89.b8c8f8","type":"ui_group","z":"","name":"Weather","tab":"65f7f859.acb6c8","order":1,"disp":true,"width":"6","collapse":true},{"id":"65f7f859.acb6c8","type":"ui_tab","z":"","name":"Home","icon":"dashboard","order":1}]
```

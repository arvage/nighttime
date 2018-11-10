A simple node indicating if it's day or night.

The node sets: <code>msg.payload</code> to boolean <code>true</code> or <code>false</code> payloads..it also sets a global <code>isNight</code> accessible in all flows.

it sends a <code>true</code> payload if it is dark and <code>false</code> if not dark.

The second output emits only on the transition between night to day or day to night.

Here are use-case examples:
```json
[{"id":"234f6a9a.b07736","type":"ui_switch","z":"d4103bdb.c43d28","name":"","label":"Christmas Lights","group":"fe8c1b89.b8c8f8","order":0,"width":0,"height":0,"passthru":false,"decouple":"true","topic":"","style":"","onvalue":"true","onvalueType":"bool","onicon":"","oncolor":"","offvalue":"false","offvalueType":"bool","officon":"","offcolor":"","x":350,"y":120,"wires":[[]]},{"id":"fd3305b3.64fb88","type":"nighttime","z":"d4103bdb.c43d28","name":"Home","lon":"-117.66053","lat":"33.56086","x":110,"y":120,"wires":[["234f6a9a.b07736"],[]]},{"id":"71569c5d.7a6d14","type":"inject","z":"d4103bdb.c43d28","name":"","topic":"","payload":"","payloadType":"date","repeat":"60","crontab":"","once":false,"onceDelay":0.1,"x":130,"y":260,"wires":[["47176280.f8f3fc"]]},{"id":"47176280.f8f3fc","type":"function","z":"d4103bdb.c43d28","name":"Check if isNight is true","func":"var isNight = global.get(\"isNight\");\nif (isNight === true)\n{\n    //do something\n    //e.g turn on christmas tree lights\n}\nif (isNight === false)\n{\n    //do something\n    //e.g turn off all lights\n}\n// you can use this function anywhere \n// without using multiple nighttime nodes\n// just have the inject trigger this function","outputs":1,"noerr":0,"x":400,"y":260,"wires":[[]]},{"id":"fe8c1b89.b8c8f8","type":"ui_group","z":"","name":"Weather","tab":"65f7f859.acb6c8","order":1,"disp":true,"width":"6","collapse":true},{"id":"65f7f859.acb6c8","type":"ui_tab","z":"","name":"Home","icon":"dashboard","order":1}]
```

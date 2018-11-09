A simple node indicating if it's day or night.

The node sets: msg.payload to boolean "true" or "false" payloads.

The node checks every 2 minutes if current time and date is bigger than todays sunset and less than tomorrow's sunrise times.

it sends a "true" payload if it is dark and "false" if not dark.

This is done using DarkSky API and with latitude and longitude set of coordinates.

You need to open free account on DarkSky.net and get an API key in order to make this node working.

Powered by the Dark Sky Forecast API.


Here are use-case examples:
```json
[{"id":"a8c19d6a.709f8","type":"tab","label":"Flow 1","disabled":false,"info":""},{"id":"97b70b5b.93ac78","type":"nighttime","z":"a8c19d6a.709f8","name":"nighttime","lon":"","lat":"","x":100,"y":120,"wires":[["82d2af5a.f178c"]]},{"id":"fcfe76f2.ab48d8","type":"comment","z":"a8c19d6a.709f8","name":"readme","info":"just set nighttime node to set the global \"isNight\"\nthen you can use it in any function. \ncheck both examples here\nyou can get the output directly from the node or \nyou can use a function to call the node value \n","x":390,"y":80,"wires":[]},{"id":"bbebbd22.3386b","type":"ui_switch","z":"a8c19d6a.709f8","name":"","label":"switch","group":"fe8c1b89.b8c8f8","order":0,"width":0,"height":0,"passthru":true,"decouple":"false","topic":"","style":"","onvalue":"1","onvalueType":"num","onicon":"","oncolor":"","offvalue":"0","offvalueType":"num","officon":"","offcolor":"","x":390,"y":180,"wires":[["a5f7987d.eaef48"]]},{"id":"a5f7987d.eaef48","type":"mqtt out","z":"a8c19d6a.709f8","name":"","topic":"/ChristmasLight/Switch","qos":"","retain":"","broker":"4c9fd7ba.0fded8","x":580,"y":180,"wires":[]},{"id":"91cffa7a.83dc08","type":"function","z":"a8c19d6a.709f8","name":"","func":"var isNight = global.get(\"isNight\");\nif (isNight === true)\n{\n    msg.payload = 1;\n    return msg;\n}\nif (isNight === false)\n{\n    msg.payload = 0;\n    return msg;\n}\n","outputs":1,"noerr":0,"x":250,"y":180,"wires":[["bbebbd22.3386b"]]},{"id":"39e6de54.1c3fa2","type":"inject","z":"a8c19d6a.709f8","name":"","topic":"","payload":"","payloadType":"str","repeat":"60","crontab":"","once":false,"onceDelay":0.1,"x":110,"y":180,"wires":[["91cffa7a.83dc08"]]},{"id":"82d2af5a.f178c","type":"ui_switch","z":"a8c19d6a.709f8","name":"","label":"switch","group":"fe8c1b89.b8c8f8","order":0,"width":0,"height":0,"passthru":true,"decouple":"false","topic":"","style":"","onvalue":"true","onvalueType":"bool","onicon":"","oncolor":"","offvalue":"false","offvalueType":"bool","officon":"","offcolor":"","x":300,"y":120,"wires":[[]]},{"id":"fe8c1b89.b8c8f8","type":"ui_group","z":"","name":"Weather","tab":"65f7f859.acb6c8","order":1,"disp":true,"width":"6","collapse":true},{"id":"4c9fd7ba.0fded8","type":"mqtt-broker","z":"","name":"","broker":"172.16.172.63","port":"1883","clientid":"Nodered","usetls":false,"compatmode":true,"keepalive":"60","cleansession":true,"birthTopic":"","birthQos":"0","birthPayload":"","willTopic":"","willQos":"0","willPayload":""},{"id":"65f7f859.acb6c8","type":"ui_tab","z":"","name":"Home","icon":"dashboard","order":1}]
```

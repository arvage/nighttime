A simple node indicating if it's day or night.

The node sets: msg.payload to boolean "true" or "false" payloads.

The node checks every 2 minutes if current time and date is bigger than todays sunset and less than tomorrow's sunrise times.

it sends a "true" payload if it is dark and "false" if not dark.

This is done using DarkSky API and with latitude and longitude set of coordinates.

You need to open free account on DarkSky.net and get an API key in order to make this node working.

Powered by the Dark Sky Forecast API.

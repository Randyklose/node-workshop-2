/* ### How's the weather?
  * Go to [Dark Sky API](https://darksky.net/dev/) and read the documentation
  * Get yourself a free API key
  * Remember the Google Geocoding API from yesterday's workshop
  * Using both APIs, complete the following workflow:
    * Ask the user for their location
    * Retrieve the weather for the user's location
    * Display the current weather as well as the next 5 days weather in a nice way
    * **Hint**: to display the results in a nice way, a few NPM modules could be useful,
    including but not limited to:
      * `colors`
      * `cli-table`
      * `node-emoji`
  * Add/commit/push*/


var requestJson = require("./library/request-json");
var prompt = require('prompt');
var Table = require('cli-table');
var colors = require('colors');
var emoji = require('node-emoji')

var cityUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=";
var weatherUrl = "https://api.darksky.net/forecast/6c9f3ea6f33282b767d3d4ba347823f2/";

function weather() {
    console.log("Where are you?");
    prompt.get(["location"], function(err, result) {
        if (err) {
            console.log("Error!");
        }
        else {
            var finalCityUrl = cityUrl + result.location;

            requestJson(finalCityUrl, function(error, response) {
                if (error) {
                    console.log(error);
                }
                else {
                    var lat = response.results[0].geometry.location.lat;
                    var lon = response.results[0].geometry.location.lng;

                    var finalWeatherUrl = weatherUrl + lat + "," + lon;

                    requestJson(finalWeatherUrl, function(error1, result) {
                        if (error1) {
                            console.log(error1);
                        }
                        else {
                            
                            var minTemp =["Min Temp"];
                            var maxTemp =["Max Temp"];
                            var precipProbability =["Precipitation Prob"];
                            var icon =["Icon"];
                            for (var i=0; i<5; i++) {
                                minTemp.push(colors.yellow(result.daily.data[i].temperatureMin));
                                maxTemp.push(colors.blue(result.daily.data[i].temperatureMax));
                                precipProbability.push(colors.red(result.daily.data[i].precipProbability));
                                icon.push(colors.rainbow(result.daily.data[i].icon));
                            }
                           
                            var table = new Table({
                                head: ["  ", colors.rainbow("Day1"), colors.rainbow("Day2"), colors.rainbow("Day3")
                                , colors.rainbow("Day4"), colors.rainbow("Day5")],
                                colWidths: [10, 10, 10, 10, 10, 10]
                            });
                            table.push(minTemp,
                            maxTemp,
                            precipProbability,
                            icon);
                            console.log(table.toString());

                        }
                    });

                }

            });
        }
    });
}

weather();
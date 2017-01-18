/*### Creating our own callback-receiving function (higher-order function)
  * Create a file called `request-as-json.js`
  * In it, create a function called `requestJson` that takes a URL and a callback function as parameters.
  * In your function, do the following:
    1. Using the `request` library, make a request to the URL that you were provided.
    2. When you receive the response:
      a. If there is an error, call the callback function and pass it the error as the first parameter
      b. If there is no error, move to step 3
    3. Use `JSON.parse` inside a try/catch block to parse the response:
      a. If there was an error parsing JSON, call the callback function and pass it the same error
      as the first parameter
      b. If there was no error parsing the JSON, call the callback function and pass it a `null` error 
      as the first parameter, and the parsed response as the second parameter
*/
var request = require("request");

var url= "http://api.open-notify.org/iss-now.json";

function requestJson(url, callback) {
    request(url, function(err, result) {
        if (err) {
            console.log("00000")
            callback(err);
        }
        else {
            try {
                var total = JSON.parse(result.body);
                
                callback(null, total);
            }
            catch(error) {
                console.log("-----")
                callback(error);
            }
        }
    });
}

requestJson(url,function(err, result){
    if(err){
        console.log(err);
    }
    else {
        console.log(result);
    }
    
});

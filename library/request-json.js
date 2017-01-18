var request = require("request");


function requestJson(url, callback) {
    request(url, function(err, result) {
        if (err) {
            
            callback(err);
        }
        else {
            try {
                
                var total = JSON.parse(result.body);
                console.log(total)
                callback(null, total);
            }
            catch(error) {
              console.log("----")
                callback(error);
            }
        }
    });
}

module.exports = requestJson;
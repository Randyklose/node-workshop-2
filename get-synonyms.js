/*### Synonyms/similar words/equivalent words/commensurate words
  * Go to [Big Huge Thesaurus](https://words.bighugelabs.com/api.php) and read the documentation for the API
  * Get yourself a free API key from their system
  * Using this API, we will create a NodeJS app for synonyms
  * **Creating the API**:
    * Create a file `library/synonyms.js`
    * In this file, create and export a **constructor function** called `SynonymAPI`. 
    It takes an api key as parameter and sets it on the new object
    * In the prototype of `SynonymAPI`, add a function `getSynonyms`. It takes a word and a callback. 
    makes a request to the web api and gives back the results **as an object** to the callback function.
    * *If there was an error, it should be passed down to the callback*
  * **Creating the program**:
    * Create a file `get-synonyms.js` at the root of your project
    * Import your module and create an instance using your API key
    * Prompt the user for a word
    * Using your API, retrieve the synonyms/antonyms/etc. for the input word
    * If everything goes well, display all the results to the user in a nice way
    * **Hint**: to display the results in a nice way, a few NPM modules could be useful, 
    including but not limited to:
      * `colors`
      * `cli-table`
      * `node-emoji`
  * Add/commit/push*/
var requestJson = require("./library/request-json");
var Table = require('cli-table');
var prompt = require('prompt');
var colors = require('colors');
var emoji = require('node-emoji');
var url = "http://words.bighugelabs.com/api/2/9aa0d827168e719870de4950a789303e/word/json";

// function getSynonyms(str, callback) {

//     prompt.get(['word'], function(err, result) {
//         if (err) {
//             console.log("Error 1!");
//         }
//         else {
//             var urlWord = "http://words.bighugelabs.com/api/2/9aa0d827168e719870de4950a789303e/" + result.word + "/json";

//             requestJson(urlWord, function(error, answer) {
//                 if (error) {
//                     console.log("Error:", error);
//                 }
//                 else {
//                     var synonymVerb = [];
//                     var synonymsNoun = [];
//                     var antonymVerb = [];
//                     var antonymNoun =[];

//                         if (answer.hasOwnProperty("verb") && answer.verb.hasOwnProperty("syn")) {
//                             synonymVerb.push(answer.verb.syn.slice(0, 7));

//                         }
//                         if (answer.hasOwnProperty("noun") && answer.noun.hasOwnProperty("syn")) {
//                              synonymsNoun.push(answer.noun.syn.slice(0, 7));
//                         }
//                         if(answer.hasOwnProperty("noun") && answer.noun.hasOwnProperty("ant")) {
//                                  antonymNoun.push(answer.noun.ant.slice(0, 7));
//                         }
//                         if(answer.hasOwnProperty("verb") && answer.verb.hasOwnProperty("ant")) {
//                                 antonymVerb.push(answer.verb.ant.slice(0, 7));
//                         }


//                     var table = new Table({
//                         head: [colors.rainbow("Type"), colors.rainbow("Synonyms & Antonyms")]
//                     });

//                     table.push({
//                         'Synonym Noun': colors.yellow(synonymsNoun)
//                     }, {
//                         'Synonym Verb': colors.green(synonymVerb)
//                     }, {
//                         'Antonym Verb': colors.blue(antonymVerb)
//                     },
//                     {
//                         'Antonym Noun': antonymNoun
//                     });
//                     console.log(table.toString());
//                 }
//             });

//         }
//     });
// }

// getSynonyms();

//EXERCISE WITH PROMISES

var promptPromise = require("prompt-promise");
var requestPromise = require("request-promise");

function getSynonyms(str, callback) {

   return promptPromise('word')
        .then(function(result) {

            var urlWord = "http://words.bighugelabs.com/api/2/9aa0d827168e719870de4950a789303e/" + result + "/json";
            return requestPromise(urlWord);
        })
        .then(function(answer) {
            
            var data = JSON.parse(answer);
                var synonymVerb = [];
                var synonymNoun = [];
                var antonymVerb = [];
                var antonymNoun = [];

                if (data.hasOwnProperty("verb") && data.verb.hasOwnProperty("syn")) {
                    synonymVerb.push(data.verb.syn.slice(0, 7));

                }
                if (data.hasOwnProperty("noun") && data.noun.hasOwnProperty("syn")) {
                    synonymNoun.push(data.noun.syn.slice(0, 7));
                }
                if (data.hasOwnProperty("noun") && data.noun.hasOwnProperty("ant")) {
                    antonymNoun.push(data.noun.ant.slice(0, 7));
                }
                if (data.hasOwnProperty("verb") && data.verb.hasOwnProperty("ant")) {
                    antonymVerb.push(data.verb.ant.slice(0, 7));
                }

                var table = new Table({
                    head: [colors.rainbow("Type"), colors.rainbow("Synonyms & Antonyms")]
                });

                table.push({
                    'Synonym Noun': colors.yellow(synonymNoun)
                }, {
                    'Synonym Verb': colors.green(synonymVerb)
                }, {
                    'Antonym Verb': colors.blue(antonymVerb)
                }, {
                    'Antonym Noun': antonymNoun
                });
                return table;
            });
}

getSynonyms().then(function(result) {
    console.log(result.toString());
    promptPromise.end();
})
.catch(function(err) {
    console.log("There was an error",err);
})
var request = require('request');
request('https://jsonplaceholder.typicode.com/todos/1', function(error, response, body){
  if (!error && response.statusCode == 200) {
    var parsedData = JSON.parse(body);
    //Show the HTML page for the Google Homepage
    console.log(parsedData["title"]);

  }
  else if (error) {
    console.log("Somethig went WRONG");
    console.log(error);
  }
});
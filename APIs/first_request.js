var request = require('request');
request('http://www.google.com', function(error, response, body){
  if (!error && response.statusCode == 200) {
    console.log(body);  //Show the HTML page for the Google Homepage
  }
  else if (error) {
    console.log("Somethig went WRONG");
    console.log(error);
  }
});
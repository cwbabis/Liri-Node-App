require("dotenv").config();
require('node-spotify-api');

var axios = require("axios");
var moment = require('moment');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);



var inputString = process.argv;
var command = inputString[2];


if (command === "concert-this") {
    var artist = inputString[3];
    //%20
    
    axios
    .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(function(response) {
      var returningObject = response.data
      for (i = 0; i < returningObject.length; i++){
      console.log(response.data[i].venue.name);
      console.log(response.data[i].venue.city);
      console.log(moment(response.data[i].datetime).format("MM/DD/YYYY"));
      console.log("=====================================")
      }
    })
  
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

else if (command === "spotify-this-song"){
  var song = inputString[3];
  spotify.search({ type: 'track', query: song }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });
// command to display Artist(s)
//The song's name
//A preview link of the song from Spotify
//The album that the song is from


}
else if (command === "movie-this"){

}
else if (command === "do-what-it-says"){

}
else {
    command = "Not a recognized command"
}

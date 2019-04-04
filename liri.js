require("dotenv").config();
require('node-spotify-api');

var axios = require("axios");
var moment = require('moment');
var keys = require("./keys.js");
/* var spotify = new Spotify(keys.spotify); */



var inputString = process.argv;
var command = inputString[2];


if (command === "concert-this") {
  var artist = inputString[3];
  //%20

  axios
    .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(function (response) {
      var returningObject = response.data
      for (i = 0; i < returningObject.length; i++) {
        console.log(response.data[i].venue.name);
        console.log(response.data[i].venue.city);
        console.log(moment(response.data[i].datetime).format("MM/DD/YYYY"));
        console.log("=====================================")
      }
    })

    .catch(function (error) {
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

else if (command === "spotify-this-song") {
  var song = inputString[3];
  spotify.search({ type: 'track', query: song }, function (err, data) {
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
else if (command === "movie-this") {

  var movie = inputString[3];
  axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
    function (response) {
      // This will output the following information to your terminal/bash window:
      console.log("==============================");
      // * Title of the movie.
      console.log("Title: " + response.data.Title);
      // * Year the movie came out.
      console.log("Release Year: " + response.data.Year);
      // * IMDB Rating of the movie.
      console.log("IMDB Rating: " + response.data.imdbRating);
      // * Rotten Tomatoes Rating of the movie.
      console.log("Rotten Tomatoes: " + response.data.tomatoRating);
      // * Country where the movie was produced.
      console.log("Produced in: " + response.data.Country);
      // * Language of the movie.
      console.log("Language: " + response.data.Language);
      // * Plot of the movie.
      console.log("Plot: " + response.data.Plot);
      // * Actors in the movie.
      console.log("Actors: " + response.data.Actors);

      if (inputString[3] = inputString[""]) {
        axios.get("http://www.omdbapi.com/?t=" + "Mr. Nobody" + "&y=&plot=short&apikey=trilogy").then(
          function (response) {
            // This will output the following information to your terminal/bash window:
            console.log("==============================");
            // * Title of the movie.
            console.log("Title: " + response.data.Title);
            // * Year the movie came out.
            console.log("Release Year: " + response.data.Year);
            // * IMDB Rating of the movie.
            console.log("IMDB Rating: " + response.data.imdbRating);
            // * Rotten Tomatoes Rating of the movie.
            console.log("Rotten Tomatoes: " + response.data.tomatoRating);
            // * Country where the movie was produced.
            console.log("Produced in: " + response.data.Country);
            // * Language of the movie.
            console.log("Language: " + response.data.Language);
            // * Plot of the movie.
            console.log("Plot: " + response.data.Plot);
            // * Actors in the movie.
            console.log("Actors: " + response.data.Actors);
          });
      };

    }
  );




}
else if (command === "do-what-it-says") {

}
else {
  command = "Not a recognized command"
}

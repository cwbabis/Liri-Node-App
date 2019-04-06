require("dotenv").config();
var Spotify = require('node-spotify-api');
var fs = require("fs");
var axios = require("axios");
var moment = require('moment');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var inputString = process.argv;
var command = inputString[2];
var userInput = inputString.splice(3).join(" ");

if (command === "do-what-it-says") {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    else {
      var dataArr = data.split(",");
      command = (dataArr[0]);
      userInput = dataArr[1];
      control();
    }
  })
}
function control() {
  if (command === "concert-this") {
    var artist = userInput;

    axios
      .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
      .then(function (response) {
        var returningObject = response.data
        for (i = 0; i < returningObject.length; i++) {
          console.log(response.data[i].venue.name);
          console.log(response.data[i].venue.city);
          console.log(moment(response.data[i].datetime).format("MM/DD/YYYY"));
          console.log("==========================================")
        }
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }
  else if (command === "spotify-this-song") {
    if (!userInput) {
      userInput = "The Sign Ace of Base"
    }
    spotify.search({ type: 'track', query: userInput }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      console.log("======================================" + "\n========== Song Information ==========" + "\n======================================" + "\n" + data.tracks.items[0].artists[0].name + "\n" + data.tracks.items[0].name + "\n" + data.tracks.items[0].preview_url + "\n" + data.tracks.items[0].album.name + "\n======================================")
    });
  }
  else if (command === "movie-this") {
    var movie = userInput;
    if (!userInput) {
      axios.get("http://www.omdbapi.com/?t=" + "Mr. Nobody" + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
          console.log("=======================================" + "\n========== Movie Information ==========" + "\n=======================================" + "\nTitle: " + response.data.Title + "\nRelease Year: " + response.data.Year + "\nIMDB Rating: " + response.data.imdbRating + "\nRotten Tomatoes: " + response.data.Ratings[1].Value + "\nProduced in: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors + "\n=======================================");
        });
    }
    else {
      axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
          console.log("=======================================" + "\n========== Movie Information ==========" + "\n=======================================" + "\nTitle: " + response.data.Title + "\nRelease Year: " + response.data.Year + "\nIMDB Rating: " + response.data.imdbRating + "\nRotten Tomatoes: " + response.data.Ratings[1].Value + "\nProduced in: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors + "\n=======================================");
        }
      );
    }
  }
  else {
    command = "Not a recognized command"
  }
}
control();

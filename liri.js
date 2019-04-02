require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var inputString = process.argv;
var command = inputString[2];

if (command === "concert-this") {

}
else if (command === "spotify-this-song"){

}
else if (command === "movie-this"){

}
else if (command === "do-what-it-says"){

}
else {
    command = "Not a recognized command"
}

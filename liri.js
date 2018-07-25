var donenv = require('dotenv');
require('dotenv').config();
var keys = require("./key.js");
var Twitter = require('twitter');
var fs = require("fs");
var request = require("request");
var Spotify = require('node-spotify-api');
var t1 = process.argv[2];
var p1 = process.argv[3];
if (t1 === "my-tweets") {


    var client = new Twitter({
       
        consumer_key:keys.twitter.consumer_key,
        consumer_secret:keys.twitter.consumer_secret,
        access_token_key: keys.twitter.access_token_key,
        access_token_secret: keys.twitter.access_token_secret
    });

    var params = { screen_name: 'nodejs' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                console.log("created on:" + tweets[i].created_at + "\n" +
                    "tweet text:" + tweets[i].text + "\n" + "\n");
            }
        }
    });
}
else if (t1 === "spotify-this-song") {

    if (p1 === undefined) {
        p1 = "The sign ace of base";
    }
    var spotify = new Spotify({
 
        id:keys.spotify.id,
        secret:keys.spotify.secret
        });

    spotify.search({ type: 'track', query: p1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var s1 = data.tracks.items[0];
        console.log('song name: ' + s1.name + '\n' +
            'Artist: ' + s1.artists[0].name + '\n' +
            'Album: ' + s1.album.name + '\n' +
            'Preview Here: ' + s1.preview_url + '\n'
        );
    });
}
else if (t1 === "movie-this") {
    if (p1 === undefined) {
        p1 = "Mr. Nobody.";
    }
    var moviename = p1;
    var queryurl = "http://www.omdbapi.com/?t=" + moviename + "&plot=short&apikey=trilogy&tomatoes=true"
    // Then run a request to the OMDB API with the movie specified
    request(queryurl, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log("..................................................");
            console.log("Title of the movie:" + JSON.parse(body).Title); +'\n' +
                console.log("Year the movie came out:" + JSON.parse(body).Released); '+\n' +
                    console.log(" IMDB Rating of the movie:" + JSON.parse(body).imdbRating); '+\n' +
                        console.log(" Rotten Tomatoes Rating of the movie:" + JSON.parse(body).tomatoRating); '+\n' +
                            //   console.log(" Rotten Tomatoes Rating of the movie value:"+JSON.parse(body).Ratings[1].Value); '+\n'+
                            console.log(" Country where the movie was produced:" + JSON.parse(body).Country); '+\n' +
                                console.log(" Language of the movie:" + JSON.parse(body).Language); '+\n' +
                                    console.log(" plot of the movie:" + JSON.parse(body).Plot); '+\n' +
                                        console.log(" Actors in the movie:" + JSON.parse(body).Actors); '+\n' +
                                            console.log("..................................................");
        }
    });
}
else if (t1 === "do-what-it-says") {
    fs.readFile('random.txt', "utf8", function (error, data) {
        // splitting a text by ,
        // console.log(data);
        var text = data.split(',');

        var spotify = new Spotify({
            id: "d1a97a841ded41ceb07288601cf27dac",
            secret: "12df6cea336d4147bff130787ce85153"
        });
        // console.log(text);
        // query for spotify
        spotify.search({ type: 'track', query: text[1] }, function (err, data) {
            if (!err) {
                // looping thorugh details of songs and displays data of song
                for (var i = 0; i < data.tracks.items.length; i++) {
                    var songData = data.tracks.items[i];
                    //artist
                    console.log("Artist: " + songData.artists[0].name);
                    //song name
                    console.log("Song: " + songData.name);
                    //spotify preview link
                    console.log("Preview URL: " + songData.preview_url);
                    //album name
                    console.log("Album: " + songData.album.name);
                    console.log("-----------------------");


                }
            }
        });
    });
}
else if(t1 === undefined)
{
    console.log("LIRI does not recognize that command");
}

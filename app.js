var express = require("express");
var app = express();

var apiToken = '7fd7f0d76a1af99b0873199cb94d6b89';

var request = require('request');

app.set("view engine", "ejs");

app.use(express.static('public'));

var request = require("request");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function () {
  console.log("Server is ready!")
});

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/food", function (req,res) {
  res.render("food");
});

app.post("/food/all", function (req, res) {
  res.redirect("/food/all");
})

app.get("/food/all", function (req, res) {
  request('https://api.uwaterloo.ca/v2/foodservices/locations.json?key=7fd7f0d76a1af99b0873199cb94d6b89', function (error, response, body) {
  if(!error && response.statusCode == 200) {
    var allFoodResults = JSON.parse(body);
    res.render("foodAll", {searchResults: allFoodResults})
  }
  });
})

app.post("/food/:id", function (req, res) {
  //getting the search term from the forum
  var restaurant = req.body.restaurant;

  //redirecting to the result display page
  res.redirect("/food/" + restaurant);
})

app.get("/food/:id", function (req, res) {
  //to find out what restaurant a user searched for
    var restaurant = req.params.id;
    //making a request to the api
    request('https://developers.zomato.com/api/v2.1/search?q='+restaurant+'&apikey=a14399473dda131cb917e581b48c21bb', function (error, response, body) {
      if(!error && response.statusCode == 200) {
        //so that we can access the JSON files
        var searchResults = JSON.parse(body);

        res.render("searchRestaurants", {searchResults: searchResults});
      } else {
        console.log(error)
      }
    });
});

app.get("/events", function (req, res) {
  request('https://api.uwaterloo.ca/v2/feds/events.json?key=7fd7f0d76a1af99b0873199cb94d6b89', function (error, response, body) {
  if(!error && response.statusCode == 200) {
    var allEventResults = JSON.parse(body);
    res.render("events", {searchResults: allEventResults})
  }
  });
})

app.get("/courses", function (req, res) {
  res.render("courses")
})

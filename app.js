var express = require("express");
var app = express();

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

app.post("/food", function (req, res) {

});

app.get("/food", function (req,res) {
  res.render("food");
});

app.get("food/zomato/:id", function (req, res) {
  //to find out what restaurant a user searched for
  var restaurant = req.params.id;
  //making a request to the api
  request('https://developers.zomato.com/api/v2.1/search?q='+restaurant+'&apikey=a14399473dda131cb917e581b48c21bb', function (error, response, body) {
    if(!error && response.statusCode == 200) {
      //so that we can access the JSON files
      var searchResults = JSON.parse(body);

      res.render("results", {searchResults: searchResults, currentUser: req.user});
    } else {
      console.log(error)
    }
  });
});

var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.listen(3000, function () {
  console.log("Server is ready!")
});

app.get("/", function (req, res) {
  res.render("home")
})

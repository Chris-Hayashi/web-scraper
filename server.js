//Import express, handlebars, and mongoose npm packages
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

//Scraping tools
const axios = require("axios");
const cheerio = require("cheerio");

//Requiring models
const db = require("./models");

//Initializing express
const app = express();

const PORT = 3000;

//Parse request body as JSON
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//Make public a static folder
app.use(express.static("public"));

//Connect to mongoose
const MONGODB_URI = process.env.MONGODB_URI || 
                  "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

//Set Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


//ROUTES
app.get("/scrape", function(req, res) {

});

app.get("/articles", function(req, res) {

});

app.get("/articles/:id", function(req, res) {

});

app.post("/articles/:id", function(req, res) {

});

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});
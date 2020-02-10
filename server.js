//Import express, handlebars, and mongoose npm packages
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

//Scraping tools
const axios = require("axios");
const cheerio = require("cheerio");

//Requiring models
// const db = require("./models");

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
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

//Set Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Array to contain scraped objects
var scraped = [];

//ROUTES
app.get("/scrape", function(req, res) {
    axios.get("http://espn.com").then(function(response) {
        console.log("axios is working");
        // console.log("Here is axios' response: " + response.data);
        const $ = cheerio.load(response.data);

        // $(".contentItem").each(function(i, element) {
        //     const result = {};

        //     // console.log("Here is this: " + $(this));
        //     console.log("Here is the link to video" + JSON.stringify($(this).children("section").children("a").attr("href")));
        //     // console.log("Here is the link to video" + JSON.stringify($(this).children("section").children("a")));
            
        // });

        $(".video-play-button").each(function(i, element) {
            let link = $(this).attr("data-popup-href");
            if (link !== undefined)
                var title = $(this).parentsUntil(".contentItem")
                                .children(".contentItem__content")
                                .children(".contentItem__contentWrapper")
                                .children(".contentItem__titleWrapper")
                                .children(".contentItem__title")
                                .text();

            console.log("original value of link: " + link);
            console.log("Title of that link: " + title);

            if ((title !== "") && (scraped.some(obj => obj.link !== String(link)) || !scraped.length)) 
                scraped.push({
                    "link": link,
                    "title": title
                });
        });
        console.log("Value of scraped array" + JSON.stringify(scraped));
    });
});

app.get("/articles", function(req, res) {

});

app.get("/articles/:id", function(req, res) {

});

app.post("/articles/:id", function(req, res) {

});


//FUNCTIONS
// function videoScraper(link) {
//     // console.log("value of link within videoScraper(): " + link);
//     console.log("videoScraper() function is called.");

//     axios.get(link).then(function(response) {
//         const $ = cheerio.load(response.data);


//     });
// }

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});
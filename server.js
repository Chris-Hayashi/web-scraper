//Import express, handlebars, and mongoose npm packages
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const util = require("util");

//Scraping tools
const axios = require("axios");
const cheerio = require("cheerio");

//Requiring models
const db = require("./models");

//Initializing express
const app = express();

const PORT = process.env.PORT || 3000;

//Parse request body as JSON
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//Make public a static folder
app.use(express.static("public"));

//Connect to mongoose
const MONGODB_URI = process.env.MONGODB_URI || 
                  "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });

//Set Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Array to contain scraped objects
// var scraped = [];

//ROUTES
app.get("/", function(req, res) {
    // console.log("/ route is called");
    // res.render("index");
    db.Sport.find({})
        .then(function(dbSport) {
            // console.log("Value of dbSport: " + dbSport);
            res.render("index", {sports: dbSport});
        })
        .catch(function(err) {
            res.json(err);
        });
});

app.get("/scrape", function(req, res) {
    axios.get("http://espn.com").then(function(response) {
        var result = {};

        console.log("axios is working");
        // console.log("Here is axios' response: " + response.data);
        const $ = cheerio.load(response.data);
        
        // console.log("# of entries: " + db.Sport.find({"title": title}).limit(1).size());

        // console.log("# of entries: " + util.inspect(db.Sport.find({"link": "http://www.espn.com/video/clip?id=28675818"}).limit(1).size()));

        $(".video-play-button").each(function(i, element) {
            let link = $(this).attr("data-popup-href");
            // if (link !== undefined)
            var title = $(this).parentsUntil(".contentItem")
                .children(".contentItem__content")
                .children(".contentItem__contentWrapper")
                .children(".contentItem__titleWrapper")
                .children(".contentItem__title")
                .text();

            // console.log("original value of link: " + link);
            // console.log("Title of that link: " + title);


            // if ((title !== "") && (scraped.some(obj => obj.link !== String(link)) || !scraped.length)) {

            
                // scraped.push({
                //     "link": link,
                //     "title": title
                // });
                // console.log("# of entries: " + db.Sport.find({"title": title})._fields);
                if ((title !== "") && (link !== undefined) &&
                    (db.Sport.find({"title": title})._fields === undefined)) {
                    if (link[0] === "h")
                        result.link = link;
                    else if (link[0] === "/")
                        result.link = "http://www.espn.com".concat(link);

                    result.title = title;


                    db.Sport.create(result)
                        .then(function(dbSport) {
                            // console.log("This is the sport added to db: " + dbSport);
                        })
                        .catch(function(err) {
                            console.log(err);
                    });
                }
            // }
        });
        // console.log("Value of scraped array" + JSON.stringify(scraped));
        db.Sport.find({})
        .then(function(dbSport) {
            // console.log("Value of dbSport: " + dbSport);
            res.render("index", {sports: dbSport});
        })
        .catch(function(err) {
            res.json(err);
        });
        // res.render("index");
    });
});

app.get("/sports", function(req, res) {
    db.Sport.find({})
        .then(function(dbSport) {
            console.log("Value of dbSport: " + dbSport);
            res.render("saved", {sports: dbSport});
        })
        .catch(function(err) {
            res.json(err);
        });
});

app.put("/api/sports/:id", function(req, res) {
    console.log("api route called");
    // console.log(("http://www.espn.com/video/clip?id=".concat(req.params.id)));
    // db.Sport.findOneAndUpdate({ _id: "http://www.espn.com/video/clip?id=".concat(req.params.id)}, { saved: true }, function(error, edited) {
    db.Sport.findOneAndUpdate({ _id: req.params.id}, {$set: { saved: true }}, function(error, edited) {
        if (error) {
            console.log(error);
            res.send(error);
          }
          else {
            // Otherwise, send the result of our update to the browser
            // console.log(edited);
            res.send(edited);
          }
    });
});

// app.get("/sports/:id", function(req, res) {
//     db.Sport.findOne({ _id: req.params.id })
//         .populate("note")
//         .then(function(dbSport) {
//             res.json(dbSport);
//         })
//         .catch(function(err) {
//             res.json(err);
//         })
// });

app.post("/sports/:id", function(req, res) {
    db.Note.create(req.body)
        .then(function(dbNote) {
            return db.Sport.findOneAndUpdate({ _id: req.params.id}, { note: dbNote._id}, { new: true});
        })
        .then(function(dbSport) {
            res.json(dbSport);
        })
        .catch(function(err) {
            res.json(err);
        });
});






app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});
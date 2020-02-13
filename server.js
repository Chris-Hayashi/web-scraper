//Import express, handlebars, and mongoose npm packages
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

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
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });

//Set Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


//ROUTES
app.get("/", function(req, res) {
    db.Sport.find({})
        .then(function(dbSport) {
            res.render("index", {sports: dbSport});
        })
        .catch(function(err) {
            res.json(err);
        });
});

app.get("/scrape", function(req, res) {
    axios.get("http://espn.com").then(function(response) {
        var result = {};

        const $ = cheerio.load(response.data);

        $(".video-play-button").each(function(i, element) {
            let link = $(this).attr("data-popup-href");

            const title = $(this).parentsUntil(".contentItem")
                .children(".contentItem__content")
                .children(".contentItem__contentWrapper")
                .children(".contentItem__titleWrapper")
                .children(".contentItem__title")
                .text();

                if ((title !== "") && (link !== undefined) &&
                    (db.Sport.find({"title": title})._fields === undefined)) {
                    if (link[0] === "h")
                        result.link = link;
                    else if (link[0] === "/")
                        result.link = "http://www.espn.com".concat(link);

                    result.title = title;


                    db.Sport.create(result)
                        .then(function(dbSport) {
                        })
                        .catch(function(err) {
                            console.log(err);
                    });
                }

        });

        $(".contentItem__padding").each(function(i, element) {
            let link = $(this).attr("href");

            const title = $(this).children("contentItem__contentWrapper")
                .children("contentItem__titleWrapper")
                .children("contentItem__title")
                .text();

            if ((title !== "") && (link !== undefined)) {

                if (link[0] === "h")
                    result.link = link;
                else if (link[0] === "/")
                    result.link = "http://www.espn.com".concat(link);

                result.title = title;

                db.Sport.create(result)
                        .then(function(dbSport) {
                        })
                        .catch(function(err) {
                            console.log(err);
                    });
            }

        });
        db.Sport.find({})
        .then(function(dbSport) {
            res.render("index", {sports: dbSport});
        })
        .catch(function(err) {
            res.json(err);
        });
    });
});

app.get("/saved", function(req, res) {
    db.Sport.find({})
        .then(function(dbSport) {
            res.render("saved", {sports: dbSport});
        })
        .catch(function(err) {
            res.json(err);
        });
});

app.get("/api/clear", function(req, res) {
    db.Sport.deleteMany({}, function(err) {
        if (err)
            console.log(err);
    });
});

app.put("/api/sports/:id", function(req, res) {
    db.Sport.findOneAndUpdate({ _id: req.params.id}, {$set: { saved: true }}, function(error, edited) {
        if (error) {
            res.send(error);
          }
          else {
            res.send(edited);
          }
    });
});

app.get("/sports/:id", function(req, res) {
    db.Sport.find({ _id: req.params.id })
        .populate("note")
        .then(function(dbSport) {
            res.json(dbSport);
        })
        .catch(function(err) {
            res.json(err);
        })
});

app.post("/sports/:id", function(req, res) {
    db.Note.create(req.body)
        .then(function(dbNote) {
            return db.Sport.findOneAndUpdate({ _id: req.params.id}, {$push: { note: dbNote._id }}, { new: true});
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
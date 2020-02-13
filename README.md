# web-scraper

## The Assignment

To design a website that lets users view and comment on recent news. The source used for this website is ESPN.com and all credit goes to them for their media content.

## How It Works

This website uses 5 npm packages: express, express-handlebars, mongoose, cheerio, and axios. Express is used to setup the server and handlebars is used to render components of the website dynamically. Axios was used to make an API call to ESPN and cheerio was used to scrape the data retrieved. This was done to get the videos and articles necessary. This data was then stored in MongoDB using Mongoose. However, mLab was used when the website had to be deployed. Two collections were created:sports and notes. The MVC filing system was also used.

## Technologies Used

Visual Studio Code, Git Bash, Heroku, MongoDB, Google Chrome

## Demo

![demo](public/assets/images/demo.gif)

## Code Screenshots

### Models

#### Sport.js
![Sport1](public/assets/images/Sport1.png)

#### Note.js
![Note1](public/assets/images/Note1.png)

#### index.js
![index1](public/assets/images/index1.png)

### Public/Assets

#### style.css
![css1](public/assets/images/css1.png)
![css2](public/assets/images/css2.png)

#### index.js
![js1](public/assets/images/js1.png)
![js2](public/assets/images/js2.png)
![js3](public/assets/images/js3.png)

### Views

#### main.handlebars
![main1](public/assets/images/main1.png)

#### navbar.handlebars
![navbar1](public/assets/images/navbar1.png)
![navbar2](public/assets/images/navbar2.png)

#### index.handlebars
![indexhbs](public/assets/images/indexhbs.png)

#### saved.handlebars
![saved1](public/assets/images/saved1.png)
![saved2](public/assets/images/saved2.png)

### server.js
![server1](public/assets/images/server1.png)
![server2](public/assets/images/server2.png)
![server3](public/assets/images/server3.png)
![server4](public/assets/images/server4.png)
![server5](public/assets/images/server5.png)
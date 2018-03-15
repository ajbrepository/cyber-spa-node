//Node Back End to render the HTMLs
var express = require('express');
var path = require('path');
const favicon = require('express-favicon');
const port = process.env.PORT || 8080;
const app = express();
const MongoClient = require('mongodb').MongoClient
const MONGOURL = process.env.MONGOURL || 'mongodb://mongoUser:MongoDB2018@ds233228.mlab.com:33228/mongo-crud-db';
const MONGODBNAME = process.env.MONGODBNAME||'pages';
var fs = require("fs"),json;

function readJsonFileSync(filepath, encoding){

if (typeof (encoding) == 'undefined'){
    encoding = 'utf8';
}
var file = fs.readFileSync(filepath, encoding);
return JSON.parse(file);
}

function getJSONData(file){
var filepath = __dirname + '/../data/' + file;
return readJsonFileSync(filepath);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
MongoClient.connect(MONGOURL, (err, database) => {
    // ... start the server
    if (err) return console.log(err)
    db = database.db()
    json=getJSONData('quotes.json');
    console.log('Quotes Data Loaded '+json.length);
    var quoteOfDay=json[getRandomInt(0,json.length-1)];
    console.log(quoteOfDay);
    app.use(favicon(__dirname + '/../public/images/favicon.ico'));
    // set the view engine to ejs
    app.set('view engine', 'ejs');
    // default options

    app.get('/', function (req, res) {
        console.log("Webapp root Navigated at " + new Date().toString());
        //res.sendFile(path.join(__dirname, '../public/startup.html'));
        db.collection('page-contents').find({"type":"main"}).toArray(function(err, pages) {
            console.log(pages);
            quoteOfDay=json[getRandomInt(0,json.length-1)];
            console.log(quoteOfDay);
            res.render('pages/startup',{pages:pages , quoteOfDay:quoteOfDay});
        })
        
    });
    app.get('/contact', function (req, res) {
        console.log("Conatcts Navigated at " + new Date().toString());
        db.collection('page-contents').find({"type":"about"}).toArray(function(err, pages) {
            console.log(pages);
            quoteOfDay=json[getRandomInt(0,json.length-1)];
            console.log(quoteOfDay);
            res.render('pages/startup',{pages:pages, quoteOfDay:quoteOfDay});
        })
    });
    app.listen(port, function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log("Application started successfully at ::" + port);
        }
    })
})

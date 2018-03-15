//Node Back End to render the HTMLs
var express = require('express');
var path = require('path');
const favicon = require('express-favicon');
const port = process.env.PORT || 8080;
const app = express();
const MongoClient = require('mongodb').MongoClient
const MONGOURL = process.env.MONGOURL || 'mongodb://mongoUser:MongoDB2018@ds233228.mlab.com:33228/mongo-crud-db';
const MONGODBNAME = process.env.MONGODBNAME||'pages';
MongoClient.connect(MONGOURL, (err, database) => {
    // ... start the server
    if (err) return console.log(err)
    db = database.db()

    app.use(favicon(__dirname + '/public/images/favicon.ico'));
    // set the view engine to ejs
    app.set('view engine', 'ejs');
    // default options

    app.get('/', function (req, res) {
        console.log("Webapp root Navigated at " + new Date().toString());
        //res.sendFile(path.join(__dirname, '../public/startup.html'));
        db.collection('page-contents').find().toArray(function(err, pages) {
            console.log(pages);
            res.render('pages/startup',{pages:pages});
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

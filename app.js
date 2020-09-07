var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    request = require('request'),
    cheerio = require('cheerio'),
    app = express(),
    bodyParser = require('body-parser'),
    env  = process.env;


app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({extended: true}));

//tell express that we want to use the www folder for our static assets
app.use(express.static(path.join(__dirname, 'assets')));

app.post('/scrape', function(req, res){
    res.setHeader('Content-Type', 'application/json');

    //make a new request to the URL provided in the HTTP POST request
    request(req.body.url, function (error, response, responseHtml) {
        var resObj = {};

        
        if (error) {
            res.end(JSON.stringify({error: 'There was an error of some kind'}));
            return;
        }

        //create the cheerio object
        resObj = {},
            //set a reference to the document that came back
            $ = cheerio.load(responseHtml),
            
            $title = $('head title').text(),
            $desc = $('meta[name="description"]').attr('content'),
            $ogTitle = $('meta[property="og:title"]').attr('content'),
            $ogImage = $('meta[property="og:image"]').attr('content'),
            $images = $('img');

        if ($title) {
            resObj.title = $title;
        }

        if ($desc) {
            resObj.description = $desc;
        }

        if ($ogImage && $ogImage.length){
            resObj.ogImage = $ogImage;
        }

        if ($ogTitle && $ogTitle.length){
            resObj.ogTitle = $ogTitle;
        }

        if ($images && $images.length){
            resObj.images = [];

            for (var i = 0; i < $images.length; i++) {
                resObj.images.push($($images[i]).attr('src'));
            }
        }

        //send the response
        res.end(JSON.stringify(resObj));
    }) ;
});

//listen for an HTTP request
app.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost');

console.log('Navigate your brower to: http://localhost:3000');

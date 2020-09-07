var mCache=require('./cacheMemory'),
    express = require('express'),
    path = require('path'),
    request = require('request'),
    cheerio = require('cheerio'),
    app = express(),
    bodyParser = require('body-parser'),
    env  = process.env;

app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({extended: true}));

//use static assets
app.use(express.static(path.join(__dirname, 'assets')));

HandleErrorFunction=(res,err)=>{
    res.end(JSON.stringify({error: 'There was an error of some kind'}));
}

populateMetadata = (metadata,$,$title,$desc,$ogImage,$ogTitle,$ogDesc,$images)=>{
    
    if ($title) {
        metadata.title = $title;
    }

    if ($desc) {
        metadata.description = $desc;
    }

    if ($ogDesc) {
        metadata.ogDescription = $ogDesc;
    }

    if ($ogImage && $ogImage.length){
        metadata.ogImage = $ogImage;
    }

    if ($ogTitle && $ogTitle.length){
        metadata.ogTitle = $ogTitle;
    }

    if ($images && $images.length){
        metadata.images = [];

        for (var i = 0; i < $images.length; i++) {
            metadata.images.push($($images[i]).attr('src'));
        }
    }
    return metadata;
}

scrapeMetadata=(responseHtml)=>{

    var metadata= {},
            $ = cheerio.load(responseHtml),
            
            $title = $('head title').text(),
            $desc = $('meta[name="description"]').attr('content'),
            $ogTitle = $('meta[property="og:title"]').attr('content'),
            $ogDesc=$('meta[property="og:description"]').attr('content'),
            $ogImage = $('meta[property="og:image"]').attr('content'),
            $images = $('img');

        //console.log($);
            
    metadata=populateMetadata(metadata,$,$title,$desc,$ogImage,$ogTitle,$ogDesc,$images);

    return metadata;
}

app.post('/scrape', function(req, res){

    var metadata={};
    var url=req.body.url;

    if(mCache.checkChache(url)==1){
        //console.log("from cache");
        res.end(JSON.stringify(mCache.getCachedMetadata(url)));
        //return;
    }

    res.setHeader('Content-Type', 'application/json');

    request(req.body.url, function (error, response, responseHtml) {
        
        if (error) {
            HandleErrorFunction(res,error);
            return;
        }

        //Scrape URL with Cheerio
        metadata = scrapeMetadata(responseHtml);

        mCache.setCacheMetadata(req.body.url,metadata);

        res.end(JSON.stringify(metadata));

    }) ;
});

app.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost');

console.log('Navigate your brower to: http://localhost:3000');

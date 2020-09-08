# Metadata-scrapper-NodeJS

[![CircleCI](https://github.com/sairam269/Metadata-scrapper-NodeJS/blob/master/assets/images/metadataScraperNodeJS.png?raw=true)](http://metadata-scrapper-nodejs.herokuapp.com/)

This NodeJS application can scrape an input URL and parse its metadata. If the page has OG parameters set exclusively, then it returns all the OG parameters. If they are not set, it parses the webpage to get relevant details such as title, description, images etc.


You can see a hosted version of `Metadata-scrapper-NodeJS` on <a href="http://metadata-scrapper-nodejs.herokuapp.com/" target="_blank">Heroku</a>.

## Requirements

* Node 8
* Git

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/sairam269/Metadata-scrapper-NodeJS
cd Metadata-scrapper-NodeJS
```

```bash
npm install
```

## Run the app

To start the express server, run the following

```bash
node app.js
```

Open [http://localhost:5000](http://localhost:5000) to see the UI.


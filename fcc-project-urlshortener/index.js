require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const isUrlHttp = require('is-url-http');

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// create model schema
const Schema = mongoose.Schema;
const urlSchema = new Schema({
  shortURL: Number,
  longURL: String,
});
const urlModel = mongoose.model("URL", urlSchema);

// Basic Configuration
const port = process.env.PORT || 3000;

// Use body-parser to Parse POST Requests, Place before all routs are defined
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.post("/api/shorturl", async (req, res) => {
  var { url: long } = req.body;

  // if url is not valid
  if (!isUrlHttp(long)) {
    res.json({ error: "Invalid URL" });
  }
// if url is valid then get a short version of it
  else {
    var short = await getShort(long);
    res.json({ original_url: long, short_url: short });
  }
});

// redirect short url to original url
app.get("/api/shorturl/:short", (req,res) => {
  let test = req.params.short;
  urlModel.findOne({ shortURL: test }, (err, foundURL) => {
      if (err) throw err;
      if (!foundURL){
        res.json({error: "No short URL found for the given input"});
       }
        else  
      res.redirect(foundURL.longURL);
  });
});  




//generate short url
async function getShort(url) {
  var val;

  let foundURL = await urlModel.findOne({ longURL: url });
  // if url not found in db then add it
  if (!foundURL) {
    console.log("url not found, and will be added");
    // find total number of urls already in the db
    let count = await urlModel.estimatedDocumentCount();
    // add 1 for next url
    var sUrl = count + 1;
    // save new url in db
    let newURL = await new urlModel({ longURL: url, shortURL: sUrl }).save();
    console.log("url added ", newURL);
    // set newURL's shortURL value to be returned
    val = newURL.shortURL;
  }
  // if url is found, set its shortURL value to be returned
  else {
    console.log("url already present");

    val = foundURL.shortURL;
  }
  // return short url
  return val;
}

//console.log("http://example.com: "+isValidHttpUrl("https://example.com"));
//console.log("example.com: "+isValidHttpUrl("example.com"));

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

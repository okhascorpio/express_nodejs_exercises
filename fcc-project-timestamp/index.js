// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  dateGiven = req.params.date; 
  // if date parameter not present?
  if (!dateGiven){
    date= new Date();
  }
  
  // if date parameter is present
  else
  {
    // check if parameter is data string?
    if (isNaN(+dateGiven)) 
   
    date= new Date(dateGiven);
    else // parameter is number string, convert to number
    date= new Date(Number(dateGiven));

  }

  // check if invalid date
  if (date == "Invalid Date")
  res.json({error: "Invalid Date"})
  else // date is valid 
  res.json({unix: date.getTime(), utc: date.toUTCString()});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

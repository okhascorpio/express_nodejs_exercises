const express = require('express');
const cors = require('cors');
require('dotenv').config();
var app = express();

// require multer
const multer = require('multer');
const upload = multer();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Use body-parser to Parse POST Requests, Place before all routs are defined
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());



app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// add multer upload middleware, filename 'upfile' found in index.html
app.post("/api/fileanalyse/",upload.single('upfile'), (req,res,done)=>{
if (!req.file){
  res.json({error: "no file"})
  done(null);
}
else {
  //console.log(req.file, req.body);
  const resObj = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  } 
  res.json(resObj);
  done(null);
}
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

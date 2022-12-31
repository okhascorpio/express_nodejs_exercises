require('dotenv').config();
let express = require('express');
let app = express();
let bodyParser = require('body-parser');


// 1 Meet the Node console
console.log("Hello World");




// 11 Use body-parser to Parse POST Requests, Place before all routs are defined
app.use
(
  bodyParser.urlencoded({extended: false})
);


// 2 Start a Working Express Server
// http://localhost:3000/hello
app.get
(
  "/hello", (req, res) => 
  {
  res.send("Hello Express");
  }
);


// 3 Serve an HTML File
// http://localhost:3000/
indexPath = __dirname + "/views/index.html";
// Serve an HTML File
app.get
(
  "/", (req,res) => 
  {
    res.sendFile(indexPath);
  }
);


// 4 Serve Static Assets
stylePath = __dirname + "/public";
app.use
(
  "/public", express.static(stylePath)
);


// 5 Serve JSON on a Specific Route
// 6 Use the .env File // Add MESSAGE_STYLE=uppercase to the .env file
// http://localhost:3000/json
app.get
(
  "/json",(req,res) => 
{
if (process.env.MESSAGE_STYLE === "uppercase")
  {
    res.json({"message": "HELLO JSON"});
  } 
  else 
  {
    res.json({"message": "Hello json"});
  }
}
);


//7 Implement a Root-Level Request Logger Middleware 
app.use
(
  (req,res,next) => 
    {
    // method path - ip
    console.log(req.method+" "+req.path+" - "+req.ip);
    next();
    }
);



// 8 Chain Middleware to Create a Time Server
// http://localhost:3000/now
app.get
(
  "/now", (req, res, next) => 
    {
      req.time = new Date().toString(); 
      next();
    } , 
        (req, res) => 
          {
           res.send({time: req.time});
          }
);


// 9 Get Route Parameter Input from the Client
// http://localhost:3000/Hello/echo
app.get
(
  "/:word/echo", (req, res) => 
    {
      res.json({echo: req.params.word});  
    }
);


// 10 Get Query Parameter Input from the Client
// http://localhost:3000/qname?first=Hello&last=World
app.get
(
  "/qname", (req, res) =>
    {
      var {first: fName, last: lName} = req.query;
      res.json(
                {name: `${fName} ${lName}`}
                //{name: fName+" "+lName} //Also this works
              );
    }
     
);


// 11 Use body-parser to Parse POST Requests, 
// Place before all routs are defined


// 12 Get Data from POST Requests
app.post
  (
    "/name", (req,res) =>
      {
        var {first: fName, last: lName} = req.body;
        res.json(
                {name: `${fName} ${lName}`}             
              );
      }
  );


 module.exports = app;
 

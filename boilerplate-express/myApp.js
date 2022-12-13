require('dotenv').config();
let express = require('express');
let app = express();


// 1 Meet the Node console
console.log("Hello World");


// 2 Start a Working Express Server
app.get("/hello", (req, res) => {
  res.send("Hello Express");
});


// 3 Serve an HTML File
indexPath = __dirname + "/views/index.html";
// Serve an HTML File
app.get("/", (req,res) => {
    res.sendFile(indexPath);
});


// 4 Serve Static Assets
stylePath = __dirname + "/public";
app.use("/public", express.static(stylePath));


// 5 Serve JSON on a Specific Route
// 6 Use the .env File
app.get("/json",(req,res) => {
  if (process.env.MESSAGE_STYLE === "uppercase"){
    res.json({"message": "HELLO JSON"});
  } 
  else {
    res.json({"message": "Hello json"});
  }
});


//7 Implement a Root-Level Request Logger Middleware
app.use((req,res,next) => {
  // method path - ip
  console.log(req.method+" "+req.path+" - "+req.ip);
  next();
});


 module.exports = app;

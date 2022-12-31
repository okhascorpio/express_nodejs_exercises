const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()


// Mongoose setup 
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

// create model schema
const exSchema = new mongoose.Schema({
  username: { type: String, required: true },
  exercise:[{ description: {type: String, required: true},
              duration: {type: Number, required: true},
              date: Date
            }]
  });

const userModel = mongoose.model("exercise", exSchema);


app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
  });

// Use body-parser to Parse POST Requests, Place before all routs are defined
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());




// Post request for username handeler
app.post("/api/users/", (req,res,done) => {
  var user = req.body.username;
  if (!user) {
    res.json({error: "username required"}); 
    done(null);
  }
  else{

    //new userModel({username: user}).save((err,user) => {
    userModel.findOneAndUpdate({username: user},{},{upsert: true, new: true}, (err, user) => {  
      if (err) throw err;
      const userObj= {
        username: user.username,
         _id:user._id
        }
      res.json(userObj);
      done(null, user);
    
    });
  }
}) 
 

// Post request for exercises handeler
app.post("/api/users/:_id/exercises/", (req, res, done) => {
  const userId = req.body._id || req.params._id; 
  
  const exerciseToAdd = { 
    description: req.body.description,
    duration: req.body.duration,
    date: Date//(new Date(dateSeed))// || new Date
  };
  
  if (!req.body.date) {exerciseToAdd.date= new Date;}
  else {exerciseToAdd.date= new Date(req.body.date);}


// if no description or duration is given
  if (!exerciseToAdd.description/*.length == 0*/ || !exerciseToAdd.duration || isNaN(exerciseToAdd.duration) ) {
    res.json({error: "description and duration is required, and duration should be a number"}); done(null);
  }
  
  // if date is invalid
  else if (isNaN(exerciseToAdd.date)) {
    res.json ({error: "invalid Date"});
    done(null);
  }  
  
  else {  
    userModel.findByIdAndUpdate(userId, {$push: { exercise: exerciseToAdd } }, {new: true}, (err, data) => {
      if(err) 
        return console.log(err);  
      else if (data == null) { res.json ({error: "id not found"}); done(null);}
      else { 
        const responseObj = {
        username: data.username,
        description: exerciseToAdd.description,
        duration: Number(exerciseToAdd.duration),
        date: new Date(exerciseToAdd.date).toDateString(),
        _id: userId
      };
      res.json(responseObj);
      done (null, data);
    }
    });
  }
  
}) 

    


// GET request for all the users
app.get("/api/users", (req,res,done) => {
userModel.find().select({_id: 1, username: 1}).exec((err, listOfUsers)=>{
  if (err) throw err;
  else if (listOfUsers==null) {
    res.json ({error: "no user found"}); 
    done(null, listOfUsers);
  }
  else {
  res.json(listOfUsers);
  done(null, listOfUsers);
  }
});
}) 


// get request to /api/:id/logs
app.get("/api/users/:_id/logs", (req,res,done)=>{
  const userId = req.params._id;
  const from = new Date(req.query.from);
  const to = new Date(req.query.to);
  const limit = Number(req.query.limit);
  userModel.findById(userId).exec((err, data)=>{
    if (err) throw err;
    else if (data==null) {
      res.json({error: "id not cound"});
      done(null,data);
    }
    else { 
      let log = data.exercise.map(ex => ({
      description: ex.description,
      duration: ex.duration,
      date: new Date(ex.date).toDateString()
      }));
      if (!isNaN(from) && !isNaN(to)) {
        log = log.filter(ex => ((new Date(ex.date) >= from) && (new Date(ex.date) <= to)));
      }
      if (limit) {
        log = log.slice(0, limit);
      }
      const count = log.length;
      const responseObj = {
        _id: userId,
        username: data.username,
        count: count,
        log: log
      }

    res.json(responseObj);
    done(null,data);
  }
  })
}) 



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

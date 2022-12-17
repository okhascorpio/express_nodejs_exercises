require('dotenv').config();

// 1. Install and Set Up Mongoose
const mongoose = require('mongoose');
// Connect to mongodb
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// 2. Create a Model
// create person schema
const Schema = mongoose.Schema;
const personSchema = new Schema
  (
    {
      name: { type: String, required: true },
      age: Number,
      favoriteFoods: [String]
    }
  );

// create person
const Person = mongoose.model("Person", personSchema);


// 3. Create and Save a Record of a Model

const createAndSavePerson = (done) => {
  var johnDoe = new Person({ name: "John Doe", age: 35, favoriteFoods: ["Pizza", "Pie", "Salad"] });

  johnDoe.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });

};


// 4. Create Many Records with model.create()
var arrayOfPeople = [{ name: "One", age: 1, favoriteFoods: ["Food1"] },
{ name: "Two", age: 2, favoriteFoods: ["Food2"] },
{ name: "Three", age: 3, favoriteFoods: ["Food3"] }
];
var createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, person) => {
    if (err) return console.log(err);
    done(null, person);
  });
};


// 5. Use model.find() to Search Your Database

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, personFound) => {
    if (err) return console.log(err);
    done(null, personFound);
      });
};


const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
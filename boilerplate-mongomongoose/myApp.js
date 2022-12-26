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


// 6. Use model.findOne() to Return a Single Matching Document from Your Database

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, foodFound) => {
    if (err) return console.log(err);
    done(null, foodFound);
  });
  
};


// 7. Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, personIdFound) => {
    if (err) return console.log(err);
    done(null, personIdFound);
  });
  
};

// 8. Perform Classic Updates by Running Find, Edit, then Save

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) return console.lig(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, personUpdate) => {
      if (err) return console.log(err);
      done(null, personUpdate);
  });

  })
};


// 9. Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if (err) return console.log(err);
    done(null, updatedDoc);
  })

  
};


// 10. Delete One Document Using model.findByIdAndRemove

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, personRemoved) => {
    if (err) console.log(err);
    done(null, personRemoved);
  })
  
};

// 11. Delete Many Documents with model.remove()

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, personRemoved) => {
    if (err) console.log(err);
    done(null, personRemoved);

  });

};


// 12. Chain Search Query Helpers to Narrow Search Results

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
  .sort({name: 1})
  .limit(2)
  .select({age: 0})
  .exec((err, people) => {
    if (err) console.log(err);
    done(null, people);
  });

  
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

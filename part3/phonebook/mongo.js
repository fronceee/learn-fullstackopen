const mongoose = require("mongoose");

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Phonebook = mongoose.model("phonebook", phonebookSchema);

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@learnfullstack.2jt5qay.mongodb.net/?retryWrites=true&w=majority&appName=learnfullstack`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const newName = process.argv[3];
const newPhone = process.argv[4];

if (newName && newPhone) {
  const newPhonebook = new Phonebook({
    name: process.argv[3],
    number: process.argv[4],
  });
  newPhonebook.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Phonebook.find({}).then((result) => {
    console.log("phonebook:");
    result.map((person) => console.log(`${person.name} ${person.number}`));
    mongoose.connection.close();
  });
}

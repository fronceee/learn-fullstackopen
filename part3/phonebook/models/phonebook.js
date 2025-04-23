const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => console.log("error connecting to MongoDB:", error.message));

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: (v) => /^(\d{2}|\d{3})-\d{6,}$/.test(v),
    message: (props) => `${props.value} is not a valid phone number!`,
  },
});

phonebookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    // biome-ignore lint/performance/noDelete:
    delete returnedObject._id;
    // biome-ignore lint/performance/noDelete:
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("phonebook", phonebookSchema);

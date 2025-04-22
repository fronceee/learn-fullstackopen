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
  number: String,
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

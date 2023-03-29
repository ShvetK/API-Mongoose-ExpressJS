const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://ShvetAnaghan:s0NlrwNK138KQS4m@cluster0.ppqwqqr.mongodb.net/Tutorial7?retryWrites=true&w=majority";

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connection create sucessfully with Tutorial7 MongoDatabase.");
  })
  .catch((error) => {
    console.log(error);
  });

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };

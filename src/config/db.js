const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const connect = async () => {
  return mongoose.connect(
    "mongodb+srv://r:g@cluster0.fjubkcl.mongodb.net/mock-11?retryWrites=true&w=majority",
    { useNewUrlParser: "true", useUnifiedTopology: "true" }
  );
};
module.exports = connect;

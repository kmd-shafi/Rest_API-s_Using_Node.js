const mongoose = require("mongoose");
mongoose.set("strictQuery", true); // worning

async function connectMongoDb(url) {
  return mongoose
    .connect(url)
    .then(() => {
      console.log("connected mongoBD");
    })
    .catch((err) => {
      console.log(err);
    });
}
module.exports = { connectMongoDb };

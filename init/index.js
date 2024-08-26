const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({...obj,owner:"66c1cc8769873156fead7329"}));
  //the above line changes the schema of the user creates a new user of same details but  with a new column of ownner
  
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
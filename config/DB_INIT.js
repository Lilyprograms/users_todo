const mongoose = require("mongoose");

const DB_INIT = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database Running Successfully`);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = DB_INIT;

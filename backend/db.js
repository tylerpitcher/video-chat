const mongoose = require('mongoose');

const connectToDB = async () => {
  try {
    const connection = mongoose.connect(process.env.DB_URI);
    console.log('MongoDB Connected.');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectToDB;
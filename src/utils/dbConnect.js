// connect and disconnect from db

const { default: mongoose } = require("mongoose");

class DatabaseUtils {
  static async dbConn() {
    await mongoose.connect(process.env.DATABASE_URL);
  }

  static async dbDisConn() {
    await mongoose.disconnect();
  }
}

module.exports = {
  DatabaseUtils,
};

const { app } = require("./serverConfig.js");
const { loadEnvFile } = require("node:process");
const { DatabaseUtils } = require("./utils/dbConnect.js");

loadEnvFile("./.env");
console.log(process.env.PORT);

// ensure the db is ready and connection
DatabaseUtils.dbConn().then(() => {
  // then run the server
  app.listen(process.env.PORT || 3000, () => {
    console.log("App is running, go hard king");
  });
});

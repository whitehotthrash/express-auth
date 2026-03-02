const { app } = require("./serverConfig.js");
const { loadEnvFile } = require("node:process");

loadEnvFile("./.env");
console.log(process.env.PORT)

app.listen(process.env.PORT || 3000, () => {
  console.log("App is running")
})
const express = require("express");
const app = express();

// remember to set this
// this allows us to post json body data
// into our endpoints
app.use(express.json());

app.get("/", (request, response) => {
    response.json({
        message:"Hello, world!"
    });
});

// Import the controller routers
const userRouter = require("./controllers/UserController.js");
// app.use(path, router);
app.use("/users", userRouter);
module.exports = {
    app
}
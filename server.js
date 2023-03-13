import express from "express";
const app = express();

// #############################################################################
// Logs all request paths and method

// #############################################################################
// This configures static hosting for files in /public that have the extensions
// listed in the array.

// #############################################################################
// Catch all handler for all other request.

app.get("/demo", (request, response) => {
  response.send(" demo app is working");
});

app.get("/", (request, response) => {
  response.send("app is working");
});
const port = process.env.PORT || 5000;
app.listen(port);

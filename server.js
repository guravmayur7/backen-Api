import express from "express";
const app = express();

app.get("/demo", (request, response) => {
  response.send(" demo app is working");
});

app.get("/", (request, response) => {
  response.send("app is working");
});
const port = process.env.PORT || 5000;
app.listen(port);

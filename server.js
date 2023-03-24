import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const username = "guravmayur7";
const password = "6PtuCVmsuB9QDx40";
const cluster = "cluster0.ydurnhm";
const dbname = "db_kajraa";
// mongoose.connect(
//   `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`
// );

const CONNECTION_URL = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log("connection stablished");
    })
  )
  .catch((error) => console.log(error.message));
//mongoose.set("useFindAndModify", false); //remove warnings from console.

app.get("/demo", (request, response) => {
  response.send(" demo app is working");
});

app.get("/", (request, response) => {
  response.send("app is working");
});

//app.listen(PORT);

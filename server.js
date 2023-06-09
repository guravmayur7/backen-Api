import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import bannerRoute from "./routes/banner.js";
import categoryRoute from "./routes/category.js";
import productRoute from "./routes/product.js";
//frontend import start here
import FrontendCategoryRoute from "./routes/frontend/category.js";
import FrontendProductsRoute from "./routes/frontend/products.js";
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
app.use(express.static("public"));
app.use(express.static("assets"));

app.use("/auth", authRoute);
app.use("/banners", bannerRoute);
app.use("/category", categoryRoute);
app.use("/product", productRoute);

//frontend routes starts here
app.use("/api/category", FrontendCategoryRoute);
app.use("/api/product", FrontendProductsRoute);
//frontend routes end here
//app.listen(PORT);

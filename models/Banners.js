import mongoose from "mongoose";

const bannerSchema = mongoose.Schema({
  banner_title: String,
  banner_type: Number,
  banner_image: String,
  banner_url: String,
  banner_position: Number,
  status: Number,
});
const Banner = mongoose.model("banners", bannerSchema);
export default Banner;

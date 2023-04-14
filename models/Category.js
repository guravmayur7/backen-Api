import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  parent_id: { type: mongoose.Types.ObjectId, default: null },
  name: String,
  slug: String,
  list_image: String,
  menu_image: String,
  is_show_menu_image: Boolean,
  meta_title: String,
  meta_keyword: String,
  meta_description: String,
  status: Number,
});
const Category = mongoose.model("categories", categorySchema);
export default Category;

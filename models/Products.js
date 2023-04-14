import mongoose from "mongoose";
interface ISpecification {
  type: String;
  value: String;
}

const productsSchema = mongoose.Schema({
  product_name: { type: String },
  product_slug: { type: String },
  position: { type: Number },
  fk_category_id: { type: mongoose.Types.ObjectId },
  main_image: { type: String },
  sku: { type: String },
  upc: { type: String },
  description: { type: String },
  mrp: { type: String },
  discount_per: { type: Number },
  selling_price: { type: mongoose.Types.Decimal128 },
  mTitle: { type: String },
  mKeyword: { type: String },
  mDescription: { type: String },
  stock: { type: String },
  hsn_code: { type: String },
  gst_per: { type: String },
  status: { type: Number },
  tags: { type: [String] },
  related_images: { type: [String] },
  specification: [
    {
      sp_type: { type: String },
      sp_value: { type: String },
    },
  ],
});
const Products = mongoose.model("products", productsSchema);
export default Banner;

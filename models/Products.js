import mongoose from "mongoose";

const productsSchema = mongoose.Schema({
  product_name: {
    type: String,
    trim: true,
    required: [true, "Product name is required"],
  },
  product_slug: { type: String },
  position: { type: Number },
  fk_category_id: { type: mongoose.Types.ObjectId },
  main_image: { type: String },
  sku: {
    type: String,
    trim: true,
    require: true,
    index: {
      unique: true,
    },
    minlength: [3, "Sku can't be shorter thne 3 characters"],
    maxlength: [12, "Sku can't be longer thne 12 characters"],
  },
  upc: { type: String },
  description: { type: String },
  mrp: { type: String },
  discount_per: { type: Number },
  selling_price: { type: mongoose.Types.Decimal128 },
  mTitle: { type: String },
  mKeyword: { type: String },
  mDescription: { type: String },
  stock: { type: String },
  unit: { type: String }, //kg, psc, dousen, grams
  hsn_code: { type: String },
  gst_per: { type: String },
  status: { type: Number },
  tags: { type: [String] },
  related_images: { type: [String] },
  specification: [
    {
      sType: { type: String },
      sValue: { type: String },
    },
  ],
  varients: [
    {
      vName: { type: String },
      vValue: { type: [String] },
    },
  ],

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
const Products = mongoose.model("products", productsSchema);
export default Products;

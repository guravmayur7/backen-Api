import Products from "./../models/Products.js";

export const addProduct = async (req, res) => {
  try {
    const product = new Products();
    product.product_name = req.body.product_name;
    product.product_slug = req.body.product_slug;
    product.position = req.body.position;
    product.fk_category_id = req.body.fk_category_id;
    if (req.files.main_image) {
      product.main_image = req.files.main_image[0].filename;
    }

    if (req.files.related_images) {
      let related_img_arr = [];
      req.files.related_images.forEach((element) => {
        related_img_arr.push(element.filename);
      });
      product.related_images = related_img_arr;
    }
    //product.main_image = req.body.main_image
    product.sku = req.body.sku;
    product.upc = req.body.upc;
    product.description = req.body.description;
    product.mrp = req.body.mrp;
    product.discount_per = req.body.discount_per;
    product.selling_price = req.body.selling_price;
    product.mTitle = req.body.mTitle;
    product.mKeyword = req.body.mKeyword;
    product.mDescription = req.body.mDescription;
    product.stock = req.body.stock;
    product.unit = req.body.unit;
    product.hsn_code = req.body.hsn_code;
    product.gst_per = req.body.gst_per;
    product.status = req.body.status;
    product.tags = req.body.tags;
    //product.related_images: { type: [String] },
    product.specification = JSON.parse(req.body.specification);
    product.varients = JSON.parse(req.body.variants);
    let result = await product.save();
    console.log(result);
    return await res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return await res.status(500).send(error);
  }
};
export const getProducts = async (req, res) => {
  try {
    let result = "hello";
    return await res.status(200).send(result);
  } catch (error) {
    return await res.status(500).send(error);
  }
};
export const getProductById = async (req, res) => {
  try {
    let result = "hello";
    return await res.status(200).send(result);
  } catch (error) {
    return await res.status(500).send(error);
  }
};
export const updateProduct = async (req, res) => {
  try {
    let result = "hello";
    return await res.status(200).send(result);
  } catch (error) {
    return await res.status(500).send(error);
  }
};

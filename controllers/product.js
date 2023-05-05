import Products from "./../models/Products.js";
import fs from "fs";

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
    return await res.status(200).send(result);
  } catch (error) {
    return await res.status(500).send(error);
  }
};
export const getProducts = async (req, res) => {
  try {
    await Products.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "fk_category_id",
          foreignField: "_id",
          as: "parent_category",
        },
      },
    ])
      .then(async (result) => {
        if (result) {
          return await res.status(200).send(result);
        }
      })
      .catch(async (error) => {
        console.log(error, 44);
        return await res.status(500).send(error);
      });
  } catch (error) {
    console.log(error);
    return await res.status(500).send(error);
  }
};
export const getProductById = async (req, res) => {
  try {
    const result = await Products.findById({ _id: req.params.id });
    if (result) {
      result.main_image =
        req.protocol +
        "://" +
        req.get("host") +
        "/products/" +
        result.main_image;

      for (let index = 0; index < result.related_images.length; index++) {
        result.related_images[index] =
          req.protocol +
          "://" +
          req.get("host") +
          "/products/" +
          result.related_images[index];
      }
      return await res.status(200).send(result);
    } else {
      return await res.status(201).send(result);
    }
  } catch (error) {
    return await res.status(500).send(error);
  }
};
export const updateProduct = async (req, res) => {
  try {
    //const product = new Products();
    const product = await Products.findById({ _id: req.params.id });
    product.product_name = req.body.product_name;
    product.product_slug = req.body.product_slug;
    product.position = req.body.position;
    product.fk_category_id = req.body.fk_category_id;
    let oldImage = "./assets/products/" + product.main_image;
    if (req.files.main_image) {
      product.main_image = req.files.main_image[0].filename;
      if (oldImage) {
        fs.unlink(oldImage, function (err) {});
      }
    }
    let related_img_arr = product.related_images;
    if (req.files.related_images) {
      req.files.related_images.forEach((element) => {
        related_img_arr.push(element.filename);
      });
      product.related_images = related_img_arr;
    }
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
    if (result) {
      result.main_image =
        req.protocol +
        "://" +
        req.get("host") +
        "/products/" +
        result.main_image;

      for (let index = 0; index < result.related_images.length; index++) {
        result.related_images[index] =
          req.protocol +
          "://" +
          req.get("host") +
          "/products/" +
          result.related_images[index];
      }
    }
    return await res.status(200).send(result);
  } catch (error) {
    return await res.status(500).send(error);
  }
};
export const removeRelatedImage = async (req, res) => {
  try {
    const product_result = await Products.findById({ _id: req.params.id });
    const index = req.params.imageIndex;
    if (product_result) {
      const removable_image = product_result.related_images[index];
      product_result.related_images.map(function (img) {
        if (img === removable_image) {
          let oldImage = "./assets/products/" + removable_image;
          fs.unlink(oldImage, function (err) {});
        }
      });
      product_result.related_images.splice(index, 1);
      for (
        let index = 0;
        index < product_result.related_images.length;
        index++
      ) {
        product_result.related_images[index] =
          req.protocol +
          "://" +
          req.get("host") +
          "/products/" +
          product_result.related_images[index];
      }
      product_result.main_image =
        req.protocol +
        "://" +
        req.get("host") +
        "/products/" +
        product_result.main_image;
      await product_result.save();
      return await res.status(200).send(product_result);
    } else {
      return await res.status(404).send("Data not found");
    }
  } catch (error) {
    return await res.status(500).send(error);
  }
};

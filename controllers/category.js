import Category from "./../models/Category.js";
import fs from "fs";
import mongoose from "mongoose";
export const addCategory = async (req, res) => {
  try {
    let categoryModel = new Category();
    categoryModel.name = req.body.name;
    // if (req.body.parent_id !== "0" || req.body.parent_id !== "") {
    //   categoryModel.parent_id = new mongoose.Types.ObjectId(req.body.parent_id);
    // } else {
    //   categoryModel.parent_id = null;
    // }
    req.body.parent_id
      ? new mongoose.Types.ObjectId(req.body.parent_id)
      : (categoryModel.parent_id = null);

    categoryModel.is_show_menu_image = Boolean(req.body.is_show_menu_image);
    categoryModel.meta_description = req.body.meta_description;
    categoryModel.meta_keyword = req.body.meta_keyword;
    categoryModel.meta_title = req.body.meta_title;
    categoryModel.slug = req.body.slug;
    categoryModel.status = req.body.status;

    if (req.files.list_image) {
      categoryModel.list_image = req.files.list_image[0].filename;
    }
    if (req.files.menu_image) {
      categoryModel.menu_image = req.files.menu_image[0].filename;
    }
    let result = await categoryModel.save();
    //let result = "hello";
    return await res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return await res.status(500).send(error);
  }
};
export const getCategory = async (req, res) => {
  try {
    await Category.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "parent_id",
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
export const getCategoryById = async (req, res) => {
  try {
    const result = await Category.findById({ _id: req.params.id });

    if (result) {
      result.list_image =
        req.protocol +
        "://" +
        req.get("host") +
        "/category_images/" +
        result.list_image;
      result.menu_image =
        req.protocol +
        "://" +
        req.get("host") +
        "/category_images/" +
        result.menu_image;

      return await res.status(200).send(result);
    } else {
      return await res.status(201).send(result);
    }
  } catch (error) {
    return await res.status(500).send(error);
  }
};
export const UpdateCategory = async (req, res) => {
  try {
    let categoryModel = await Category.findById({ _id: req.body._id });
    let oldMenuImage = "./assets/category_images/" + categoryModel.menu_image;
    let oldListImage = "./assets/category_images/" + categoryModel.list_image;
    if (req.files.list_image) {
      categoryModel.list_image = req.files.list_image[0].filename;
      if (oldListImage) {
        fs.unlink(oldListImage, function (err) {});
      }
    }
    if (req.files.menu_image) {
      categoryModel.menu_image = req.files.menu_image[0].filename;
      if (oldMenuImage) {
        fs.unlink(oldMenuImage, function (err) {});
      }
    }
    categoryModel.name = req.body.name;
    //categoryModel.parent_id = req.body.parent_id;
    if (req.body.parent_id !== "null") {
      categoryModel.parent_id = new mongoose.Types.ObjectId(req.body.parent_id);
    }
    categoryModel.is_show_menu_image = Boolean(req.body.is_show_menu_image);
    categoryModel.meta_description = req.body.meta_description;
    categoryModel.meta_keyword = req.body.meta_keyword;
    categoryModel.meta_title = req.body.meta_title;
    categoryModel.slug = req.body.slug;
    categoryModel.status = req.body.status;

    let result = await categoryModel.save();
    if (result) {
      result.list_image =
        req.protocol +
        "://" +
        req.get("host") +
        "/category_images/" +
        result.list_image;
      result.menu_image =
        req.protocol +
        "://" +
        req.get("host") +
        "/category_images/" +
        result.menu_image;

      return await res.status(200).send(result);
    } else {
      return await res.status(201).send(result);
    }
  } catch (error) {
    console.log(error, 146);
    return await res.status(500).send(error);
  }
};
export const getParentCategories = async (req, res) => {
  try {
    const result = await Category.find({}, { name: 1 });
    return await res.status(200).send(result);
  } catch (error) {
    return await res.status(500).send(error);
  }
};

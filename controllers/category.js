import Category from "./../models/Category.js";
export const addCategory = async (req, res) => {
  try {
    let categoryModel = new Category();
    categoryModel.name = req.body.name;
    categoryModel.parent_id = req.body.parent_id;
    categoryModel.is_show_menu_image = req.body.is_show_menu_image;
    categoryModel.meta_description = req.body.meta_description;
    categoryModel.meta_keyword = req.body.meta_keyword;
    categoryModel.meta_title = req.body.meta_title;
    categoryModel.slug = req.body.slug;
    if (req.files) {
      console.log("file uploaded");
    }
    if (req.files.list_image) {
      categoryModel.list_image = req.files.list_image[0].filename;
    }
    if (req.files.menu_image) {
      categoryModel.menu_image = req.files.menu_image[0].filename;
    }
    console.log(req.files.list_image, 17);
    console.log(req.files.list_image[0].filename, 18);
    let result = await categoryModel.save();
    //let result = "hello";
    return await res.status(200).send(result);
  } catch (error) {
    return await res.status(500).send(error);
  }
};
export const getCategory = async (req, res) => {
  try {
    let categories = await Category.find();
    // if (banners.length > 0) {
    //   banners.map((banner) => {
    //     banner.banner_image =
    //       req.protocol +
    //       "://" +
    //       req.get("host") +
    //       "/products/" +
    //       banner.banner_image;
    //   });
    // }
    return await res.status(200).send(categories);
  } catch (error) {
    return await res.status(500).send(error);
  }
};
export const getCategoryById = async (req, res) => {
  try {
    const result = await Category.findById({ _id: req.params.id });
    if (result) {
      return await res.status(200).send(result);
    } else {
      return await res.status(201).send(result);
    }
  } catch (error) {
    console.log(error);
    return await res.status(500).send(error);
  }
};
export const UpdateCategory = async (req, res) => {
  try {
    // let bannerModel = await Banner.findById({ _id: req.body._id });
    // let oldFile = "./assets/products/" + bannerModel.banner_image;
    // bannerModel.banner_title = req.body.banner_title;
    // bannerModel.banner_type = req.body.banner_type;
    // bannerModel.banner_url = req.body.banner_url;
    // bannerModel.banner_position = req.body.banner_position;
    // bannerModel.status = req.body.status;
    // if (req.file && req.file !== undefined) {
    //   bannerModel.banner_image = req.file.filename;
    //   if (oldFile) {
    //     fs.unlink(oldFile, function (err) {
    //       bannerModel.banner_image = req.file.filename;
    //     });
    //   }
    // }

    //let result = await bannerModel.save();
    let result = "hello";

    return await res.status(200).send(result);
  } catch (error) {
    return await res.status(500).send(error);
  }
};

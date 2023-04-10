import Banner from "./../models/Banners.js";
import fs from "fs";
import path from "path";
export const addBanner = async (req, res) => {
  try {
    let bannerModel = new Banner();
    bannerModel.banner_title = req.body.banner_title;
    bannerModel.banner_type = req.body.banner_type;
    bannerModel.banner_image = req.file.filename;
    bannerModel.banner_url = req.body.banner_url;
    bannerModel.banner_position = req.body.banner_position;
    bannerModel.status = req.body.status;
    let result = await bannerModel.save();
    return await res.status(200).send(result);
  } catch (error) {
    return await res.status(500).send(error);
  }
};
export const getBanner = async (req, res) => {
  try {
    let banners = await Banner.find();
    if (banners.length > 0) {
      banners.map((banner) => {
        banner.banner_image =
          req.protocol +
          "://" +
          req.get("host") +
          "/products/" +
          banner.banner_image;
      });
    }
    return await res.status(200).send(banners);
  } catch (error) {
    return await res.status(500).send(error);
  }
};
export const getBannerById = async (req, res) => {
  try {
    const result = await Banner.findById({ _id: req.params.id });
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
export const UpdateBanner = async (req, res) => {
  try {
    let bannerModel = await Banner.findById({ _id: req.body._id });
    let oldFile = "./assets/products/" + bannerModel.banner_image;
    bannerModel.banner_title = req.body.banner_title;
    bannerModel.banner_type = req.body.banner_type;
    bannerModel.banner_url = req.body.banner_url;
    bannerModel.banner_position = req.body.banner_position;
    bannerModel.status = req.body.status;
    if (req.file && req.file !== undefined) {
      bannerModel.banner_image = req.file.filename;
      //fs.unlinkSync(path.join(oldFile));
      if (oldFile) {
        fs.unlink(oldFile, function (err) {
          //if (err) throw err;
          bannerModel.banner_image = req.file.filename;
        });
      }
    }
    let result = await bannerModel.save();

    return await res.status(200).send(result);
  } catch (error) {
    return await res.status(500).send(error);
  }
};

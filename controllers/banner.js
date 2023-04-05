import Banner from "./../models/Banners.js";
export const addBanner = async (req, res) => {
  let bannerModel = new Banner();
  bannerModel.banner_title = req.body.banner_title;
  bannerModel.banner_type = req.body.banner_type;
  bannerModel.banner_image = req.file.filename;
  bannerModel.banner_url = req.body.banner_url;
  bannerModel.banner_position = req.body.banner_position;
  bannerModel.status = req.body.status;
  let result = await bannerModel.save();
  res.send(result);
};
export const getBanner = async (req, res) => {
  try {
    let banners = await Banner.find();
    return await res.status(200).send(banners);
  } catch (error) {
    return await res.status(500).send(error);
  }
};

import Products from "./../../models/Products.js";

// export const getAllProducts = async (req, resp) => {
//   try {
//     const products = Products.find();
//     return await resp.status(200).send(products);
//   } catch (error) {
//     console.log(error);
//     return await resp.status(500).send(error);
//   }
// };

export const getAllProducts = async (req, res) => {
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
          for (let r = 0; r < result.length; r++) {
            const element = result[r];

            element.main_image =
              (await req.protocol) +
              "://" +
              req.get("host") +
              "/products/" +
              element.main_image;
            if (element.related_images) {
              for (
                let index = 0;
                index < element.related_images.length;
                index++
              ) {
                element.related_images[index] =
                  (await req.protocol) +
                  "://" +
                  req.get("host") +
                  "/products/" +
                  element.related_images[index];
              }
            }
          }
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

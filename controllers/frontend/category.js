import Category from "./../../models/Category.js";
export const getCategory = async (req, res) => {
  let responseCat = [];
  try {
    // await Category.aggregate([
    //   //   {
    //   //     $lookup: {
    //   //       from: "categories",
    //   //       localField: "_id",
    //   //       foreignField: "parent_id",
    //   //       as: "child_category",
    //   //     },
    //   //   },
    //   //   {
    //   //     $match: {
    //   //       parent_id: null,
    //   //     },
    //   //   },
    // ])
    await Category.find({ parent_id: null })
      .then(async (result) => {
        if (result) {
          let responseArray = [];
          for (let i = 0; i < result.length; i++) {
            //check here repeat category id
            let parent = result[i]; //women
            let child = {};
            child = await getChildCategory(parent._id.toString()); //athenic
            if (child.length > 0) {
              for (let c = 0; c < child.length; c++) {
                //const element = child[c];
                let gChild = {};
                gChild = await getChildCategory(child[c]._id.toString());
                child = { parentCat: child[c], childCat: gChild };
              }
            }
            responseArray[i] = { parentCat: parent, childCat: child };
          }

          return await res.status(200).send(responseArray);
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
const getChildCategory = async (parent_id = null) => {
  const result = await Category.find({ parent_id: parent_id });
  return result;
  //return parent_id;
};

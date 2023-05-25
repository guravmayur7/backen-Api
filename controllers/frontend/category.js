import Category from "./../../models/Category.js";
export const getCategory = async (req, res) => {
  try {
    const responseResult = {};
    let parentIndex = 0;
    await Category.find({ parent_id: null })
      .lean()
      .then(async (result) => {
        for (const parentCat of result) {
          const categoryGroups = await getChildCategory(
            parentCat._id.toString()
          );
          for (const catGroup of categoryGroups) {
            const categoryItems = await getChildCategory(
              catGroup._id.toString()
            );
            catGroup["categoryItems"] = categoryItems;
          }
          parentCat["categoryGroups"] = categoryGroups;
          responseResult[parentIndex] = parentCat;
          parentIndex++;
        }
        return await res.status(200).send(responseResult);
      })
      .catch(async (error) => {
        console.log(error);
        return await res.status(500).send(error);
      });
  } catch (error) {
    console.log(error);
    return await res.status(500).send(error);
  }
};
const getChildCategory = async (parent_id = null) => {
  const result = await Category.find({ parent_id: parent_id }).lean();
  return result;
};
// function delay(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

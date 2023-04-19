import Products from "./../models/Products.js";

export const addProduct = async (req, res) => {
  try {
    let result = "hello";
    return await res.status(200).send(result);
  } catch (error) {
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

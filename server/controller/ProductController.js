const mongoose = require("mongoose");
const products = require("../model/products");

const createProduct = async (req, res) => {
  try {
    let product = await products.create(req.body);
    res.status(201).json({ sucess: true, product });
  } catch (err) {
    res.status(400).json({ sucess: false, msg: "add a product failed" });
  }
};
const getAllProduct = async (req, res) => {
  try {
    let product = await products.find({});
    res.status(200).json({ product });
  } catch (err) {
    res.status(400).json({ msg: "something wrong happen" });
  }
};
const getOneProduct = async (req, res) => {
  try {
    let product = await products.findById(req.params.id);
    res.status(200).json({ product });
  } catch (err) {
    res.status(400).json({ msg: "something wrong happen" });
  }
};
const updateProduct = async (req, res) => {
  try {
    let product = await products.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({msg: "products updated",product})
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllProduct,
  createProduct,
  getOneProduct,
  updateProduct
};

const mongoose = require("mongoose");
const products = require("../model/products");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const cloudinary = require("cloudinary");

//-----------------------ADMIN CONTROLLER-------------------------------------------

const createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  let product = await products.create(req.body);
  res.status(201).json({ sucess: true, product });
});

const updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await products.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }
  product = await products.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ succes: true, product });
});

catchAsyncError(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

const getProductAdmin = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

const deleteProduct = catchAsyncError(async (req, res) => {
  let product = await products.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  product.remove();
  res.status(200).json({
    success: true,
    message: "Product delete success",
  });
});

//---------------------------------------------ALL USER CONTROLLER ------------------------------------------------

const getAllProduct = catchAsyncError(async (req, res) => {
  let { name, category, sort, select, numericFilter, page } = req.query;

  let objectQuery = {};
  if (name) {
    objectQuery.name = { $regex: name, $options: "i" };
  }
  if (category) {
    //{category:{$all : ["laptop","chemise"]}}
    category = category.split(",");
    category = { $all: category };
    objectQuery.category = category;
  }
  if (numericFilter) {
    const OperatorMap = {
      "<": "$lt",
      ">": "$gt",
      "<=": "$lte",
      ">=": "$gte",
      "=": "$eq",
    };
    const regexExp = /\b([<>]=?|=)\b/g;

    numericFilter = numericFilter.replace(
      regexExp,
      (match) => `-${OperatorMap[match]}-`
    );
    console.log(numericFilter)
    numericFilter.split(",").forEach((el) => {
      let [field, operator, value] = el.split("-");
      objectQuery[field] = { [operator]: value };
    });
  }

  let product = products.find(objectQuery);
  let productsCount = await products.countDocuments(objectQuery);

  if (sort) {
    product = product.sort(sort);
  }
  console.log(productsCount);
  let limit = 8;
  page = Number(page) || 1;
  let skip = Number((page - 1) * limit);
  product = product.skip(skip).limit(limit);
  let result = await product;
  res
    .status(200)
    .json({ products: result, total: productsCount, ResultPerPage: limit });
});

const getOneProduct = catchAsyncError(async (req, res, next) => {
  let product = await products.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  res.status(200).json({ succes: true, product });
});

module.exports = {
  getAllProduct,
  createProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
  getProductAdmin,
};

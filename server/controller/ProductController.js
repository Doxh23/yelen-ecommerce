const mongoose = require("mongoose");
const products = require("../model/products");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

//-----------------------ADMIN CONTROLLER-------------------------------------------
/**
 * create a product
 * @param {request from server} req
 * @param {respond send from server} res
 */
const createProduct = catchAsyncError(async (req, res,next) => {
  let product = await products.create(req.body);
  res.status(201).json({ sucess: true, product });
});
/**
 * update a product
 * @param {request from server} req
 * @param {respond send from server} res
 */
const updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await products.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  product = await products.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ succes: true, product });
});
/**
 * delete a product
 * @param {request from server} req
 * @param {respond send from server} res
 */
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
/**
 * get all product
 * @param {request from server} req
 * @param {respond send from server} res
 */
const getAllProduct = catchAsyncError(async (req, res) => {
  /**
   * afficher les elements par rapport aux @param {noms}
   * afficher les elements par rapport aux @param {noms}
   * afficher les elements par rapport aux @param {prix} plus grand -plus petit-etc
   * trier par rapport a un parametre @param {sort} nom description prix / etc
   * affichier juste certain element @param {select}
   *
   */
  let { name, category, sort, select, numericFilter, elPage } = req.query;
  
  let objectQuery = {};
  if (name) {
    objectQuery.name = { $regex: name, $options: "i" };
  }
  if (category) {
    //{category:{$all : ["laptop","chemise"]}}
    category = category.split(",");
    category = { $all: category };
    objectQuery.category = category;
    console.log(objectQuery);
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
    // price> 30
    //  {price : {$gte : 30}}
    numericFilter = numericFilter.replace(
      regexExp,
      (match) => `-${OperatorMap[match]}-`
    );
    console.log(numericFilter);
    numericFilter.split(",").forEach((el) => {
      let [field, operator, value] = el.split("-");
      objectQuery[field] = { [operator]: value };
    });

    console.log(objectQuery);
  }

  let product = products.find(objectQuery);
  if (sort) {
    product = product.sort(sort);
  }
  let limit = Number(req.query.limit) ||15;
  let page = Number(req.query.page) || 1
  let skip = Number((page -1)* limit)
  product = product.skip(skip).limit(limit)

  let result = await product;
  res.status(200).json({ result,total: result.length });
});

/**
 * get one product  by id
 * @param {request from server} req
 * @param {respond send from server} res
 */
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
};

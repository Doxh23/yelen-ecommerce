const mongoose = require("mongoose");

let productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name"],
    trim: true,
  },

  description: {
    type: String,
    required: [true, "pls enter product description"],
  },


  price: {
    type: Number,
    required: [true, "Please Enter Product Price"],
    maxLength: [8, "price cannot exceed 8 characters"],
  },


  rating: {
    type: Number,
    default: 0,
  },

  images: [
    {
      public_id: {
        type: String,
        required: true
      },

      url: {
        type: String,
        required: true
      },

    },
  ],


  category:[ {
    type: String,
    required: [true, "please provide product Category"]
  }],

  stock: {
    type: Number,
    required: [true, "please enter Product Stock"],
    maxLength: [4, "stock cannot excess 4 characters"],
    default: 1,
  },

  numOfReview: {
    type: Number,
    default: 0
  },
  
  review: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAT: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("products", productSchema);

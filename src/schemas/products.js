const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const reviewSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "usuarios"
  },
  rating: { type: Number, required: true, trim: true },
  comment: { type: String, required: true, trim: true },
  date: {
    type: String,
    required: true,
    trim: true
  }
});

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    ingredients: { type: [String], required: true, trim: true },
    preparation: { type: String, required: true, trim: true },
    benefits: { type: [String], required: true, trim: true },
    category: { type: String, required: true, trim: true },
    rating: { type: Number, default: 0, trim: true },
    reviews: [reviewSchema],
    image: {
      url: String,
      public_id: String
    },
    tags: { type: [String], required: true, trim: true }
  },
  {
    timestamps: true
  }
);

productSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
    delete returnedObject.updatedAt;
  }
});

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("products", productSchema);

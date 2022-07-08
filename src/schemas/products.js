const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    ingredients: { type: [String], required: true, trim: true },
    preparation: { type: String, required: true, trim: true },
    benefits: { type: [String], required: true, trim: true },
    category: { type: String, required: true, trim: true },
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

module.exports = mongoose.model("products", productSchema);

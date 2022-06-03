const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    ingredients: { type: [String], required: true },
    preparation: { type: String, required: true },
    benefits: { type: String, required: true },
    category: { type: String, required: true }
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

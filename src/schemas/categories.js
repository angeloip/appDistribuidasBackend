const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true }
  },
  {
    timestamps: true
  }
);

categorySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
    delete returnedObject.updatedAt;
  }
});

module.exports = mongoose.model("categories", categorySchema);

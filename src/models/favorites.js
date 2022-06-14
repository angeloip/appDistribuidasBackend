const mongoose = require("mongoose");

const favoriteSchema = mongoose.Schema(
  {
    dish: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usuarios"
    }
  },
  {
    timestamps: true
  }
);

favoriteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("favoritos", favoriteSchema);

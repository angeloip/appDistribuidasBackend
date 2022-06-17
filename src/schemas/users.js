const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    mobile: { type: String, trim: true, default: "" },
    password: { type: String, required: true, trim: true },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "favoritos"
      }
    ]
  },
  {
    timestamps: true
  }
);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
    delete returnedObject.password;
    delete returnedObject.updatedAt;
  }
});

module.exports = mongoose.model("usuarios", userSchema);

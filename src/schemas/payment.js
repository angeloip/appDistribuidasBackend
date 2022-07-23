const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    id_payment: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usuarios"
    },
    dish: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products"
    }
  },
  {
    timestamps: true
  }
);

paymentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
    delete returnedObject.updatedAt;
  }
});

module.exports = mongoose.model("payments", paymentSchema);

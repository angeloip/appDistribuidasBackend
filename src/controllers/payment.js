const paymentSchema = require("../schemas/payment");
const userSchema = require("../schemas/users");
const Stripe = require("stripe")("sk_test_51LOPzIIXUY55H6B6qWLyhOIKiGInCkE13XOxThoeOpNV4CCDjs2DRbqTjhgG9C3qPHWFl1yB0StwA12Xd3O3bHvd00WL0x5dGZ");

/* const stripe = new Stripe(process.env.API_STRIPE); */

const getPayments = async (req, res, next) => {
  try {
    const payments = await paymentSchema.find({}).populate("dish");

    return res.json(payments);
  } catch (error) {
    next(error);
  }
};

const createPayment = async (req, res, next) => {
  try {
    const newPayment = new paymentSchema(req.body);

    const user = await userSchema.findById(newPayment.user);

    if (user) {
      await Stripe.paymentIntents.create({
        amount: newPayment.amount,
        currency: "USD",
        description: newPayment.dish.toString(),
        payment_method: newPayment.id_payment,
        confirm: true
      });

      newPayment.amount = newPayment.amount / 100;

      const savedPayment = await newPayment.save();

      savedPayment.populate("dish");

      user.payments = user.payments.concat(savedPayment._id);

      await user.save();

      return res.json(savedPayment);
    } else {
      return res.sendStatus(404);
    }
  } catch (error) {
    return res.status(500).json({ message: error.raw.message });
  }
};

module.exports = {
  getPayments,
  createPayment
};

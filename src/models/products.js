const productSchema = require("../schemas/products");

const obtenerPlatos = async () => {
  try {
    return await productSchema.find({});
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const obtenerPlato = async (id) => {
  try {
    /* const aea = await productSchema.findById(id).populate({
      path: "reviews",
      populate: [{ path: "user", select: "name" }]
    });

    const go = aea.reviews;

    return go; */
    return await productSchema.findById(id).populate({
      path: "reviews",
      populate: [{ path: "user", select: "name" }]
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const insertarPlato = async (data) => {
  try {
    const newProduct = new productSchema(data);
    return await newProduct.save();
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const actualizarPlato = async (id, data) => {
  try {
    return await productSchema.findByIdAndUpdate(id, data, {
      new: true
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const eliminarPlato = async (id) => {
  try {
    return await productSchema.findByIdAndRemove(id);
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

module.exports = {
  obtenerPlatos,
  obtenerPlato,
  insertarPlato,
  actualizarPlato,
  eliminarPlato
};

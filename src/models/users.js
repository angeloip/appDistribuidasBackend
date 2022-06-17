const userSchema = require("../schemas/users");

const obtenerUsuarios = async () => {
  try {
    return await userSchema.find({}).populate("favorites");
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const obtenerUsuarioConEmail = async (email) => {
  try {
    return await userSchema.findOne({ email }).populate("favorites");
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const obtenerUsuario = async (id) => {
  try {
    return await userSchema.findById(id).populate("favorites");
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const insertarUsuario = async (data) => {
  try {
    const newUser = new userSchema(data);
    return await newUser.save();
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const actualizarUsuario = async (id, data) => {
  try {
    return await userSchema.findByIdAndUpdate(id, data, {
      new: true
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const eliminarUsuario = async (id) => {
  try {
    return await userSchema.findByIdAndRemove(id);
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const obtenerUsuariosPorParametro = async (param) => {
  try {
    return await userSchema.find({ nombre: new RegExp(param, "i") });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioConEmail,
  obtenerUsuario,
  insertarUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerUsuariosPorParametro
};

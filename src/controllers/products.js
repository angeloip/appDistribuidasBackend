const {
  obtenerPlatos,
  obtenerPlato,
  insertarPlato,
  actualizarPlato,
  eliminarPlato
} = require("../models/products");
const { uploadImage, deleteImage } = require("../utils/cloudinary");
const productSchema = require("../schemas/products");
const fs = require("fs-extra");
const xlsx = require("xlsx");

const getProducts = async (req, res, next) => {
  try {
    const products = await obtenerPlatos();

    return res.json(products);
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await obtenerPlato(id);

    if (!product) return res.status(404).json("404");

    return res.json(product);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const newProduct = req.body;
    let image = null;

    const ingredients = newProduct.ingredients.toString().split(",");
    const benefits = newProduct.benefits.toString().split(",");
    const tags = newProduct.tags.toString().split(",");

    newProduct.ingredients = ingredients;
    newProduct.benefits = benefits;
    newProduct.tags = tags;

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id
      };
    } else {
      image = {
        url: "",
        public_id: ""
      };
    }

    newProduct.image = image;

    const savedProduct = await insertarPlato(newProduct);

    return res.json(savedProduct);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newProductInfo = req.body;

    /* const newProductInfo = {
      name: product.name,
      ingredients: product.ingredients,
      preparation: product.preparation,
      benefits: product.benefits,
      category: product.category
    };
 */
    const productUpdate = await actualizarPlato(id, newProductInfo);

    return res.json(productUpdate);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const productDelete = await eliminarPlato(id);

    if (productDelete && productDelete.image.public_id) {
      await deleteImage(productDelete.image.public_id);
    }

    if (!productDelete) return res.sendStatus(404);

    return res.json(productDelete);
  } catch (error) {
    next(error);
  }
};

const deleteManyProducts = async (req, res, next) => {
  try {
    const ids = req.body;
    const deleteDishes = await productSchema.deleteMany({ _id: { $in: ids } });
    return res.json(deleteDishes);
  } catch (error) {
    next(error);
  }
};

const loadDishesWithExcel = async (req, res, next) => {
  try {
    const workbook = xlsx.readFile(req.files.xlsx.tempFilePath);
    const workbookSheets = workbook.SheetNames;
    const sheet = workbookSheets[0];
    const dataExcel = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);
    const dataTemp = dataExcel.map((data) => {
      data.benefits = data.benefits.split(", ");
      data.ingredients = data.ingredients.split(", ");
      data.tags = data.tags.split(", ");
      return {
        ...data,
        image: {
          url: "",
          public_id: ""
        }
      };
    });
    await fs.remove(req.files.xlsx.tempFilePath);
    const importData = await productSchema.insertMany(dataTemp);

    return res
      .status(200)
      .json({ length: importData.length, import: importData });
  } catch (error) {
    next(error);
  }
};

const exportExcel = async (req, res, next) => {
  try {
    const dishes = await obtenerPlatos();
    const data = dishes.map((dish) => {
      return {
        name: dish.name,
        ingredients: dish.ingredients.join(", "),
        preparation: dish.preparation,
        benefits: dish.benefits.join(", "),
        category: dish.category
      };
    });
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Platos");
    xlsx.writeFile(wb, "DataDePlatos.xlsx");
    return res.status(200).json("ok");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteManyProducts,
  loadDishesWithExcel,
  exportExcel
};

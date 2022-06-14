const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./images"
  })
);

//Importar conexion mongoDB;
require("./connection");
//Importanción del archivo de rutas y modelo
const productRoute = require("./routes/products");
const userRoute = require("./routes/users");
const loginRoute = require("./routes/login");
const favoriteRoute = require("./routes/favorites");
const categoryRoute = require("./routes/categories");

//middleware
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/login", loginRoute);
app.use("/api/favorites", favoriteRoute);
app.use("/api/categories", categoryRoute);

app.use((error, req, res, next) => {
  /* console.log("Error: ", error); */
  console.log("Error name: ", error.name);
  console.log("Error: ", error);
  console.log(error.message);
  return res.status(500).json({ message: error.message });
});

//route principal
app.get("/", (req, res) => {
  res.send("Bienvenidos al servidor backend");
});

//Configurar server básico
app.listen(PORT, () => {
  console.log(`El servidor ${PORT} está corriendo correctamente.`);
});

const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Importar conexion mongoDB;
require("./connection");
//Importanción del archivo de rutas y modelo usuario
const productRoute = require("./routes/products");

//middleware
app.use("/api/products", productRoute);

app.use((error, req, res, next) => {
  console.log("Error: ", error);
  console.log("Error name: ", error.name);
  res.status(500).end();
});

//route principal
app.get("/", (req, res) => {
  res.send("Bienvenidos al servidor backend");
});

//Configurar server básico
app.listen(PORT, () => {
  console.log(`El servidor ${PORT} está corriendo correctamente.`);
});

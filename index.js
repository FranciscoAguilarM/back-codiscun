const express = require("express");
const cors = require("cors");
const path = require("path"); // Requerir el módulo 'path'
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Carpeta pública para las imágenes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Cargamos el archivo de rutas
// app.use(require('./Routes/Archivos'));
app.use(require("./Routes/Donaciones"));
app.use(require("./Routes/Administradores"));

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log('El servidor escucha en el puerto ' + PORT);
});

module.exports = app;

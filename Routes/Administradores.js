const express = require("express");
const router = express.Router();

// Conexión con la base de datos
const { connection } = require("../config/config.db");

// SELECT: Obtener todos los administradores
router.get("/", (_request, response) => {
    connection.query("SELECT * FROM administradores", (error, results) => {
        if (error) {
            console.error("Error al obtener administradores:", error);
            response.status(500).json({ error: "Error interno del servidor" });
        } else {
            response.status(200).json(results);
        }
    });
});

// INSERT: Agregar un administrador
router.post("/", (request, response) => {
    const { username, password, email } = request.body;
    connection.query(
        "INSERT INTO administradores (username, password, email) VALUES (?, MD5(?), ?)",
        [username, password, email],
        (error, results) => {
            if (error) throw error;
            response.status(201).json({ "Administrador Añadido Correctamente": results.affectedRows });
        }
    );
});

// DELETE: Eliminar un administrador por ID
router.delete("/:id", (request, response) => {
    const id = request.params.id;
    connection.query("DELETE FROM administradores WHERE Id = ?", [id], (error, results) => {
        if (error) throw error;
        response.status(200).json({ "Administrador Eliminado Correctamente": results.affectedRows });
    });
});

module.exports = router;


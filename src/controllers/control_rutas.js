const express = require("express");
const router = express.Router();
const db = require("../models/db");

router.post("/agregar-ruta", (req, res) => {
  const identificador = req.body.identificador;
  const ruta = req.body.ruta;

  const sql = "INSERT INTO rutas (identificador, ruta) VALUES (?, ?)";
  db.run(sql, [identificador, ruta], function (err) {
    if (err) {
      if (err.code === "SQLITE_CONSTRAINT") {
        res.status(409).json({ error: "Ya existe una ruta con ese valor" });
      } else {
        res.status(500).json({ error: "Error al agregar la ruta" });
      }
      return;
    }
    res.json({ id: this.lastID });
  });
});

router.get("/obtener-rutas", (req, res) => {
  const sql = "SELECT rowid as id, identificador, ruta FROM rutas";
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

router.delete("/eliminar-ruta/:id", (req, res) => {
  const rutaId = req.params.id;

  const sql = "DELETE FROM rutas WHERE rowid = ?";
  db.run(sql, [rutaId], function (err) {
    if (err) {
      res.status(500).json({ error: "Error al eliminar la ruta" });
      return;
    }
    res.json({ filasEliminadas: this.changes });
  });
});

module.exports = router;

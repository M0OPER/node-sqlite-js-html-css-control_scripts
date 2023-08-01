const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.post("/agregar-control", (req, res) => {
  const nombreControl = req.body.nombre;
  const rutaRaiz = req.body.rutaRaiz;

  const sql = "INSERT INTO controles (nombre, ruta_raiz) VALUES (?, ?)";
  db.run(sql, [nombreControl, rutaRaiz], function (err) {
    if (err) {
      if (err.code === "SQLITE_CONSTRAINT") {
        res.status(409).json({ error: "Ya existe un control con ese nombre" });
      } else {
        res.status(500).json({ error: "Error al agregar el control" });
      }
      return;
    }
    res.json({ id: this.lastID });
  });
});

router.get("/obtener-controles", (req, res) => {
  const sql = "SELECT rowid as id, nombre, ruta_raiz FROM controles";
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

router.delete("/eliminar-control/:id", (req, res) => {
  const controlId = req.params.id;

  const sql = "DELETE FROM controles WHERE rowid = ?";
  db.run(sql, [controlId], function (err) {
    if (err) {
      res.status(500).json({ error: "Error al eliminar el control" });
      return;
    }
    res.json({ filasEliminadas: this.changes });
  });
});

module.exports = router;

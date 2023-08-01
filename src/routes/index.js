// src/routes/index.js

const express = require('express');
const router = express.Router();

const controlController = require('../controllers/controlController');
const rutaController = require('../controllers/rutaController');

// Rutas para Control
router.post('/agregar-control', controlController.agregarControl);
router.get('/obtener-controles', controlController.obtenerControles);
router.delete('/eliminar-control/:id', controlController.eliminarControl);

// Rutas para Ruta
router.post('/agregar-ruta', rutaController.agregarRuta);
router.get('/obtener-rutas', rutaController.obtenerRutas);
router.delete('/eliminar-ruta/:id', rutaController.eliminarRuta);

module.exports = router;

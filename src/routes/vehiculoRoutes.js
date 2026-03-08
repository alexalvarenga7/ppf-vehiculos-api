const express = require('express');
const router = express.Router();
const {
    obtenerVehiculos,
    crearVehiculo,
    actualizarVehiculo,
    eliminarVehiculo
} = require('../controllers/vehiculoController');

router.get('/', obtenerVehiculos);
router.post('/', crearVehiculo);
router.put('/:id', actualizarVehiculo);
router.delete('/:id', eliminarVehiculo);

module.exports = router;
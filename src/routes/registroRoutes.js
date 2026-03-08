const express = require('express');
const router = express.Router();
const {
    obtenerRegistros,
    crearRegistro
} = require('../controllers/registroController');

router.get('/', obtenerRegistros);
router.post('/', crearRegistro);

module.exports = router;
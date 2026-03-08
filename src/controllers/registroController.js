const pool = require('../db/connection');

const obtenerRegistros = async (req, res) => {
    const { fecha, vehiculo_id, motorista } = req.query;
    try {
        let query = `
            SELECT r.*, v.marca, v.modelo, v.placa 
            FROM registros r
            JOIN vehiculos v ON r.vehiculo_id = v.id
            WHERE 1=1
        `;
        const valores = [];
        let contador = 1;

        if (fecha) {
            query += ` AND r.fecha = $${contador}`;
            valores.push(fecha);
            contador++;
        }
        if (vehiculo_id) {
            query += ` AND r.vehiculo_id = $${contador}`;
            valores.push(vehiculo_id);
            contador++;
        }
        if (motorista) {
            query += ` AND LOWER(r.motorista) LIKE LOWER($${contador})`;
            valores.push(`%${motorista}%`);
            contador++;
        }

        query += ' ORDER BY r.created_at DESC';

        const resultado = await pool.query(query, valores);
        res.json(resultado.rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener registros', error: error.message });
    }
};

const crearRegistro = async (req, res) => {
    const { vehiculo_id, motorista, tipo, fecha, hora, kilometraje } = req.body;
    if (!vehiculo_id || !motorista || !tipo || !fecha || !hora || !kilometraje) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }
    if (!['entrada', 'salida'].includes(tipo)) {
        return res.status(400).json({ mensaje: 'El tipo debe ser entrada o salida' });
    }
    try {
        const resultado = await pool.query(
            `INSERT INTO registros (vehiculo_id, motorista, tipo, fecha, hora, kilometraje) 
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [vehiculo_id, motorista, tipo, fecha, hora, kilometraje]
        );
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear registro', error: error.message });
    }
};

module.exports = { obtenerRegistros, crearRegistro };
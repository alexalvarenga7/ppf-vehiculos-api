const pool = require('../db/connection');

const obtenerVehiculos = async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM vehiculos ORDER BY created_at DESC');
        res.json(resultado.rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener vehículos', error: error.message });
    }
};

const crearVehiculo = async (req, res) => {
    const { marca, modelo, placa } = req.body;
    if (!marca || !modelo || !placa) {
        return res.status(400).json({ mensaje: 'Marca, modelo y placa son obligatorios' });
    }
    try {
        const resultado = await pool.query(
            'INSERT INTO vehiculos (marca, modelo, placa) VALUES ($1, $2, $3) RETURNING *',
            [marca, modelo, placa]
        );
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear vehículo', error: error.message });
    }
};

const actualizarVehiculo = async (req, res) => {
    const { id } = req.params;
    const { marca, modelo, placa } = req.body;
    if (!marca || !modelo || !placa) {
        return res.status(400).json({ mensaje: 'Marca, modelo y placa son obligatorios' });
    }
    try {
        const resultado = await pool.query(
            'UPDATE vehiculos SET marca=$1, modelo=$2, placa=$3 WHERE id=$4 RETURNING *',
            [marca, modelo, placa, id]
        );
        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Vehículo no encontrado' });
        }
        res.json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar vehículo', error: error.message });
    }
};

const eliminarVehiculo = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await pool.query('DELETE FROM vehiculos WHERE id=$1 RETURNING *', [id]);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Vehículo no encontrado' });
        }
        res.json({ mensaje: 'Vehículo eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar vehículo', error: error.message });
    }
};

module.exports = { obtenerVehiculos, crearVehiculo, actualizarVehiculo, eliminarVehiculo };
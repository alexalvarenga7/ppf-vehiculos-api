const express = require('express');
const cors = require('cors');
require('dotenv').config();

const vehiculoRoutes = require('./routes/vehiculoRoutes');
const registroRoutes = require('./routes/registroRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/vehiculos', vehiculoRoutes);
app.use('/api/registros', registroRoutes);

module.exports = app;
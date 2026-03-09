# ppf-vehiculos-api
API REST con Node.js y Express para sistema de registro de vehículos
# PPF Vehículos - API

API REST para el sistema de registro de vehículos y control de entradas/salidas, desarrollada con Node.js y Express.

## Tecnologías utilizadas

- Node.js
- Express.js
- PostgreSQL (Supabase)
- pg (cliente PostgreSQL)
- dotenv
- cors

## Requisitos previos

- Node.js instalado
- Base de datos PostgreSQL (se recomienda Supabase)

## Instalación y ejecución

1. Clonar el repositorio
```bash
git clone https://github.com/alexalvarenga7/ppf-vehiculos-api.git
cd ppf-vehiculos-api
```

2. Instalar dependencias
```bash
npm install
```

3. Crear archivo `.env` en la raíz del proyecto
```
DATABASE_URL=tu_url_de_postgresql
PORT=3000
```

4. Correr el proyecto
```bash
npm run dev
```

La API estará disponible en `http://localhost:3000`

## Endpoints disponibles

### Vehículos
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/vehiculos | Obtener todos los vehículos |
| POST | /api/vehiculos | Crear un vehículo |
| PUT | /api/vehiculos/:id | Actualizar un vehículo |
| DELETE | /api/vehiculos/:id | Eliminar un vehículo |

### Registros
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/registros | Obtener registros (acepta filtros) |
| POST | /api/registros | Crear un registro |

### Filtros disponibles para GET /api/registros
- `fecha` - Filtrar por fecha (formato YYYY-MM-DD)
- `vehiculo_id` - Filtrar por ID de vehículo
- `motorista` - Filtrar por nombre del motorista

## Base de datos

Las tablas necesarias son las siguientes:
```sql
CREATE TABLE vehiculos (
    id SERIAL PRIMARY KEY,
    marca VARCHAR(100) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    placa VARCHAR(20) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE registros (
    id SERIAL PRIMARY KEY,
    vehiculo_id INTEGER REFERENCES vehiculos(id) ON DELETE CASCADE,
    motorista VARCHAR(100) NOT NULL,
    tipo VARCHAR(10) NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    kilometraje INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```
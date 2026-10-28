
import express from 'express';
import cors from 'cors';
import conexion from './conexion.js';

const app = express();
const PUERTO = 3000;

app.use(cors());
app.use(express.json());

// Comprobar conexión con MySQL
app.get('/api/salud', async (req, res) => {
    try {
        const [resultado] = await conexion.query(
            'SELECT DATABASE() AS base, NOW() AS fecha'
        );

        res.json({
            conectado: true,
            base: resultado[0].base,
            fecha: resultado[0].fecha
        });
    } catch (error) {
        console.error('Error de MySQL:', error.message);

        res.status(500).json({
            conectado: false,
            error: 'No se pudo conectar con MySQL'
        });
    }
});

// Consultar usuarios
app.get('/api/usuarios', async (req, res) => {
    try {
        const [usuarios] = await conexion.query(
            `SELECT id, nombre_usuario, email, fecha_registro, activo
             FROM usuarios`
        );

        res.json(usuarios);
    } catch (error) {
        console.error('Error al consultar usuarios:', error.message);

        res.status(500).json({
            error: 'No se pudieron consultar los usuarios'
        });
    }
});

// Consultar preferencias de un usuario
app.get('/api/usuarios/:id/preferencias', async (req, res) => {
    try {
        const [preferencias] = await conexion.execute(
            `SELECT tema, idioma, notificaciones_activadas
             FROM preferencias_usuario
             WHERE usuario_id = ?`,
            [req.params.id]
        );

        if (preferencias.length === 0) {
            return res.status(404).json({
                error: 'No se encontraron preferencias'
            });
        }

        res.json(preferencias[0]);
    } catch (error) {
        console.error('Error al consultar preferencias:', error.message);

        res.status(500).json({
            error: 'No se pudieron consultar las preferencias'
        });
    }
});
// Prueba temporal: insertar un usuario en MySQL
app.post('/api/usuarios/prueba', async (req, res) => {
    try {
        const [resultado] = await conexion.execute(
            `INSERT INTO usuarios
                (nombre_usuario, email, password_hash)
             VALUES (?, ?, ?)`,
            [
                'usuario_prueba',
                'usuario_prueba@example.com',
                'HASH_TEMPORAL_NO_VALIDO'
            ]
        );

        res.status(201).json({
            mensaje: 'Usuario insertado correctamente',
            id: resultado.insertId
        });
    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            error: 'No se pudo insertar el usuario',
            detalle: error.code
        });
    }
});
app.listen(PUERTO, () => {
    console.log(`HoopZone backend iniciado en http://localhost:${PUERTO}`);
});

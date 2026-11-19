
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import conexion, { inicializarBaseDeDatos } from './conexion.js';
import { EQUIPOS_NBA_OFICIALES, LIDERES_ESTADISTICAS, PARTIDOS_NBA_INICIALES, NOTICIAS_NBA_INICIALES, JUGADORES_NBA_OFICIALES } from './datosNBA.js';

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
            return res.json({
                usuario_id: Number(req.params.id),
                tema: 'sistema',
                idioma: 'es',
                notificaciones_activadas: 1
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

// Actualizar datos de un usuario (nombre_usuario, email)
app.put('/api/usuarios/:id', async (req, res) => {
    const { nombre_usuario, email } = req.body;
    const { id } = req.params;

    if (!nombre_usuario || !email) {
        return res.status(400).json({ error: 'Nombre de usuario y email son requeridos.' });
    }

    try {
        // Verificar si existe el usuario antes de actualizar
        const [existe] = await conexion.execute('SELECT id FROM usuarios WHERE id = ?', [id]);
        if (existe.length === 0) {
            await conexion.execute(
                `INSERT INTO usuarios (id, nombre_usuario, email, password_hash)
                 VALUES (?, ?, ?, 'HASH_DEFAULT')`,
                [id, nombre_usuario, email]
            );
        } else {
            await conexion.execute(
                `UPDATE usuarios 
                 SET nombre_usuario = ?, email = ?
                 WHERE id = ?`,
                [nombre_usuario, email, id]
            );
        }

        res.json({
            mensaje: 'Usuario actualizado correctamente',
            usuario: { id: Number(id), nombre_usuario, email }
        });
    } catch (error) {
        console.error('Error al actualizar usuario:', error.message);
        res.status(500).json({
            error: 'No se pudo actualizar el usuario',
            detalle: error.message
        });
    }
});

// Actualizar preferencias de un usuario
app.put('/api/usuarios/:id/preferencias', async (req, res) => {
    const { tema, idioma, notificaciones_activadas } = req.body;
    const { id } = req.params;

    try {
        // Asegurar que el usuario existe para evitar conflicto de clave foránea
        const [existe] = await conexion.execute('SELECT id FROM usuarios WHERE id = ?', [id]);
        if (existe.length === 0) {
            await conexion.execute(
                `INSERT INTO usuarios (id, nombre_usuario, email, password_hash)
                 VALUES (?, 'usuario_prueba', 'usuario_prueba@example.com', 'HASH_DEFAULT')`,
                [id]
            );
        }

        const temaVal = tema || 'sistema';
        const idiomaVal = idioma || 'es';
        const notifVal = notificaciones_activadas !== undefined ? (notificaciones_activadas ? 1 : 0) : 1;

        await conexion.execute(
            `INSERT INTO preferencias_usuario (usuario_id, tema, idioma, notificaciones_activadas)
             VALUES (?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE
             tema = VALUES(tema),
             idioma = VALUES(idioma),
             notificaciones_activadas = VALUES(notificaciones_activadas)`,
            [id, temaVal, idiomaVal, notifVal]
        );

        res.json({ mensaje: 'Preferencias actualizadas con éxito' });
    } catch (error) {
        console.error('Error al actualizar preferencias:', error.message);
        res.status(500).json({
            error: 'No se pudieron actualizar las preferencias',
            detalle: error.message
        });
    }
});

// Consultar equipos favoritos de un usuario
app.get('/api/usuarios/:id/equipos-favoritos', async (req, res) => {
    try {
        const [equipos] = await conexion.execute(
            `SELECT equipo_api_id, fecha_agregado 
             FROM equipos_favs_usuario 
             WHERE usuario_id = ?
             ORDER BY fecha_agregado DESC`,
            [req.params.id]
        );
        res.json(equipos);
    } catch (error) {
        console.error('Error al consultar equipos favoritos:', error.message);
        res.status(500).json({ error: 'Error al consultar equipos favoritos' });
    }
});

// Guardar equipo favorito de un usuario
app.post('/api/usuarios/:id/equipos-favoritos', async (req, res) => {
    const { equipo_api_id } = req.body;
    const { id } = req.params;

    if (!equipo_api_id) {
        return res.status(400).json({ error: 'equipo_api_id es requerido' });
    }

    try {
        // Asegurar que el usuario existe
        const [existe] = await conexion.execute('SELECT id FROM usuarios WHERE id = ?', [id]);
        if (existe.length === 0) {
            await conexion.execute(
                `INSERT INTO usuarios (id, nombre_usuario, email, password_hash)
                 VALUES (?, 'usuario_prueba', 'usuario_prueba@example.com', 'HASH_DEFAULT')`,
                [id]
            );
        }

        // Reemplazar favorito principal del usuario
        await conexion.execute(
            `DELETE FROM equipos_favs_usuario WHERE usuario_id = ?`,
            [id]
        );

        await conexion.execute(
            `INSERT INTO equipos_favs_usuario (usuario_id, equipo_api_id)
             VALUES (?, ?)`,
            [id, equipo_api_id]
        );
        res.json({ mensaje: 'Equipo favorito guardado con éxito', equipo_api_id });
    } catch (error) {
        console.error('Error al guardar equipo favorito:', error.message);
        res.status(500).json({ error: 'No se pudo guardar el equipo favorito', detalle: error.message });
    }
});

// Eliminar equipo favorito
app.delete('/api/usuarios/:id/equipos-favoritos/:equipoId', async (req, res) => {
    try {
        await conexion.execute(
            `DELETE FROM equipos_favs_usuario 
             WHERE usuario_id = ? AND equipo_api_id = ?`,
            [req.params.id, req.params.equipoId]
        );
        res.json({ mensaje: 'Equipo favorito eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar equipo favorito:', error.message);
        res.status(500).json({ error: 'No se pudo eliminar el equipo favorito' });
    }
});

// ==========================================
// INTEGRACIÓN CON LA API BALLDONTLIE (NBA)
// ==========================================
const BALLDONTLIE_BASE_URL = 'https://api.balldontlie.io/v1';

async function consultarBallDontLie(endpoint) {
    const apiKey = process.env.BALLDONTLIE_API_KEY;
    if (!apiKey) {
        throw new Error('Falta BALLDONTLIE_API_KEY en el archivo .env');
    }

    const respuesta = await fetch(`${BALLDONTLIE_BASE_URL}/${endpoint}`, {
        headers: {
            'Authorization': apiKey,
            'Content-Type': 'application/json',
        },
    });

    if (!respuesta.ok) {
        const detalle = await respuesta.text().catch(() => '');
        throw new Error(`Error en BallDontLie API (${respuesta.status}): ${detalle}`);
    }

    return await respuesta.json();
}

// 1. Obtener Equipos NBA
app.get('/api/nba/equipos', async (req, res) => {
    try {
        const [equiposDB] = await conexion.query(
            'SELECT * FROM equipos_nba ORDER BY nombre_completo ASC'
        );

        if (equiposDB.length > 0) {
            return res.json({
                total: equiposDB.length,
                datos: equiposDB
            });
        }

        // Si la tabla estuviera vacía, usar datos oficiales de respaldo
        res.json({
            total: EQUIPOS_NBA_OFICIALES.length,
            datos: EQUIPOS_NBA_OFICIALES
        });
    } catch (error) {
        console.error('Error al obtener equipos:', error.message);
        res.json({
            total: EQUIPOS_NBA_OFICIALES.length,
            datos: EQUIPOS_NBA_OFICIALES
        });
    }
});

// Sincronizar equipos y récords de la temporada actual en MySQL
app.post('/api/nba/equipos/sincronizar', async (req, res) => {
    try {
        for (const eq of EQUIPOS_NBA_OFICIALES) {
            await conexion.execute(`
                INSERT INTO equipos_nba (id, nombre, nombre_completo, abreviatura, ciudad, conferencia, division, victorias, derrotas, pct, racha)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                nombre = VALUES(nombre),
                nombre_completo = VALUES(nombre_completo),
                abreviatura = VALUES(abreviatura),
                ciudad = VALUES(ciudad),
                conferencia = VALUES(conferencia),
                division = VALUES(division),
                victorias = VALUES(victorias),
                derrotas = VALUES(derrotas),
                pct = VALUES(pct),
                racha = VALUES(racha)
            `, [eq.id, eq.nombre, eq.nombre_completo, eq.abreviatura, eq.ciudad, eq.conferencia, eq.division, eq.victorias, eq.derrotas, eq.pct, eq.racha]);
        }
        res.json({ mensaje: 'Equipos sincronizados con éxito con la temporada actual', total: EQUIPOS_NBA_OFICIALES.length });
    } catch (error) {
        console.error('Error al sincronizar equipos en BD:', error.message);
        res.status(500).json({ error: 'Error al sincronizar equipos', detalle: error.message });
    }
});

// 1.1 Posiciones y Récords (Standings) Conferencia Este y Oeste
app.get('/api/nba/posiciones', async (req, res) => {
    try {
        const [equipos] = await conexion.query(
            'SELECT * FROM equipos_nba ORDER BY pct DESC, victorias DESC'
        );

        const listaEquipos = equipos.length > 0 ? equipos : EQUIPOS_NBA_OFICIALES;

        const este = listaEquipos
            .filter(e => {
                const conf = (e.conferencia || '').trim().toLowerCase();
                return conf === 'este' || conf === 'east';
            })
            .map((e, index) => ({
                pos: index + 1,
                id: e.id,
                team: e.nombre_completo,
                shortName: e.nombre,
                abbr: e.abreviatura,
                record: `${e.victorias}-${e.derrotas}`,
                victorias: e.victorias,
                derrotas: e.derrotas,
                pct: Number(e.pct).toFixed(3),
                racha: e.racha || 'G1',
                conference: 'Este'
            }));

        const oeste = listaEquipos
            .filter(e => {
                const conf = (e.conferencia || '').trim().toLowerCase();
                return conf === 'oeste' || conf === 'west';
            })
            .map((e, index) => ({
                pos: index + 1,
                id: e.id,
                team: e.nombre_completo,
                shortName: e.nombre,
                abbr: e.abreviatura,
                record: `${e.victorias}-${e.derrotas}`,
                victorias: e.victorias,
                derrotas: e.derrotas,
                pct: Number(e.pct).toFixed(3),
                racha: e.racha || 'G1',
                conference: 'Oeste'
            }));

        res.json({ este, oeste });
    } catch (error) {
        console.error('Error al obtener posiciones:', error.message);
        res.status(500).json({ error: 'No se pudieron obtener las posiciones' });
    }
});

// 1.2 Líderes de Estadísticas de la Temporada
app.get('/api/nba/estadisticas/lideres', (req, res) => {
    res.json(LIDERES_ESTADISTICAS);
});

// 2. Buscar y Obtener Jugadores NBA (con guardado en MySQL)
app.get('/api/nba/jugadores', async (req, res) => {
    const { buscar } = req.query;

    try {
        let endpoint = 'players?per_page=30';
        if (buscar && buscar.trim().length > 0) {
            endpoint = `players?search=${encodeURIComponent(buscar.trim())}&per_page=30`;
        }

        console.log(`Consultando jugadores en BallDontLie (${endpoint})...`);
        const dataAPI = await consultarBallDontLie(endpoint);
        const jugadores = dataAPI.data || [];

        // Guardar/Actualizar jugadores en MySQL
        for (const j of jugadores) {
            await conexion.execute(
                `INSERT INTO jugadores_nba (id, nombre, apellido, posicion, numero_camiseta, equipo_id, equipo_nombre, pais, altura)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE
                 posicion = VALUES(posicion),
                 numero_camiseta = VALUES(numero_camiseta),
                 equipo_id = VALUES(equipo_id),
                 equipo_nombre = VALUES(equipo_nombre),
                 pais = VALUES(pais),
                 altura = VALUES(altura)`,
                [
                    j.id,
                    j.first_name,
                    j.last_name,
                    j.position || 'N/A',
                    j.jersey_number || '-',
                    j.team ? j.team.id : null,
                    j.team ? j.team.full_name : 'Sin equipo',
                    j.country || 'USA',
                    j.height || 'N/A'
                ]
            );
        }

        res.json({
            total: jugadores.length,
            datos: jugadores,
            meta: dataAPI.meta || {}
        });
    } catch (error) {
        console.error('Error al obtener jugadores:', error.message);
        // Fallback a MySQL si hay fallo de conexión
        try {
            const [jugadoresDB] = await conexion.query(
                buscar
                    ? `SELECT * FROM jugadores_nba WHERE nombre LIKE ? OR apellido LIKE ? LIMIT 30`
                    : `SELECT * FROM jugadores_nba LIMIT 30`,
                buscar ? [`%${buscar}%`, `%${buscar}%`] : []
            );
            return res.json({
                origen: 'base_de_datos_fallback',
                total: jugadoresDB.length,
                datos: jugadoresDB
            });
        } catch (e) {
            res.status(500).json({ error: 'Error al obtener jugadores', detalle: error.message });
        }
    }
});

// Función auxiliar para normalizar partidos de BallDontLie o de MySQL
function normalizarPartido(g) {
    if (g.home_team && g.visitor_team) {
        const isFinal = g.status && (g.status.includes('Final') || g.status === 'Final');
        const isLive = g.period > 0 && !isFinal;
        return {
            id: g.id,
            status: isLive ? 'live' : isFinal ? 'final' : 'upcoming',
            statusLabel: isLive ? `🔴 EN VIVO - Q${g.period} ${g.time || ''}` : isFinal ? 'FINAL' : (g.status || 'PROGRAMADO'),
            arena: 'Estadio NBA',
            awayTeam: g.visitor_team.full_name || 'Visitante',
            awayAbbr: g.visitor_team.abbreviation || 'VIS',
            awayRecord: g.visitor_team.conference || 'NBA',
            awayScore: g.visitor_team_score,
            homeTeam: g.home_team.full_name || 'Local',
            homeAbbr: g.home_team.abbreviation || 'LOC',
            homeRecord: g.home_team.conference || 'NBA',
            homeScore: g.home_team_score,
            time: g.status || 'Por definir',
            broadcast: 'NBA League Pass'
        };
    }

    return {
        id: g.id,
        status: g.estado || 'upcoming',
        statusLabel: g.etiqueta_estado || (g.estado === 'live' ? '🔴 EN VIVO' : g.estado === 'final' ? 'FINAL' : 'HOY'),
        arena: g.arena || 'Estadio NBA',
        awayTeam: g.equipo_visita,
        awayAbbr: g.equipo_visita ? g.equipo_visita.split(' ').pop().slice(0, 3).toUpperCase() : 'VIS',
        awayRecord: g.record_visita || 'NBA',
        awayScore: g.puntos_visita,
        homeTeam: g.equipo_local,
        homeAbbr: g.equipo_local ? g.equipo_local.split(' ').pop().slice(0, 3).toUpperCase() : 'LOC',
        homeRecord: g.record_local || 'NBA',
        homeScore: g.puntos_local,
        time: g.hora || '21:30',
        broadcast: g.transmision || 'NBA TV'
    };
}

// 3. Obtener Partidos Recientes / En Vivo de la NBA (API BallDontLie con respaldo en MySQL)
app.get('/api/nba/partidos', async (req, res) => {
    try {
        const dataAPI = await consultarBallDontLie('games?per_page=20');
        if (dataAPI && dataAPI.data && dataAPI.data.length > 0) {
            const normalizados = dataAPI.data.map(normalizarPartido);
            return res.json({
                origen: 'api_balldontlie',
                total: normalizados.length,
                datos: normalizados
            });
        }
    } catch (error) {
        // Fallback silencioso a base de datos
    }

    try {
        const [partidosDB] = await conexion.query('SELECT * FROM partidos_nba ORDER BY id ASC');
        if (partidosDB && partidosDB.length > 0) {
            const normalizados = partidosDB.map(normalizarPartido);
            return res.json({
                origen: 'mysql',
                total: normalizados.length,
                datos: normalizados
            });
        }
    } catch (e) {
        console.error('Error al consultar partidos en BD:', e.message);
    }

    const normalizados = PARTIDOS_NBA_INICIALES.map(normalizarPartido);
    res.json({
        origen: 'datos_locales',
        total: normalizados.length,
        datos: normalizados
    });
});

// 3.1 Obtener Noticias de la NBA desde MySQL
app.get('/api/nba/noticias', async (req, res) => {
    try {
        const [noticias] = await conexion.query('SELECT * FROM noticias_nba ORDER BY id ASC');
        if (noticias && noticias.length > 0) {
            return res.json({
                total: noticias.length,
                datos: noticias
            });
        }
    } catch (error) {
        console.error('Error al consultar noticias en BD:', error.message);
    }

    res.json({
        total: NOTICIAS_NBA_INICIALES.length,
        datos: NOTICIAS_NBA_INICIALES
    });
});

// 4. Jugadores Favoritos del Usuario
app.get('/api/usuarios/:id/jugadores-favoritos', async (req, res) => {
    try {
        const [jugadores] = await conexion.execute(
            `SELECT jf.jugador_api_id, jf.fecha_agregado,
                    COALESCE(jn.nombre, '') AS nombre,
                    COALESCE(jn.apellido, '') AS apellido,
                    COALESCE(jn.posicion, '') AS posicion,
                    COALESCE(jn.equipo_nombre, '') AS equipo_nombre
             FROM jugadores_favs_usuario jf
             LEFT JOIN jugadores_nba jn ON jf.jugador_api_id = jn.id
             WHERE jf.usuario_id = ?
             ORDER BY jf.fecha_agregado DESC`,
            [req.params.id]
        );

        // Completar datos faltantes con la lista de jugadores oficiales si no están en BD
        const jugadoresCompletos = jugadores.map(j => {
            if (!j.nombre && !j.apellido) {
                const oficial = JUGADORES_NBA_OFICIALES.find(o => String(o.id) === String(j.jugador_api_id));
                if (oficial) {
                    return {
                        ...j,
                        nombre: oficial.nombre,
                        apellido: oficial.apellido,
                        posicion: oficial.posicion,
                        equipo_nombre: oficial.equipo_nombre
                    };
                }
            }
            return j;
        });

        res.json(jugadoresCompletos);
    } catch (error) {
        console.error('Error al consultar jugadores favoritos:', error.message);
        res.status(500).json({ error: 'Error al consultar jugadores favoritos' });
    }
});

app.post('/api/usuarios/:id/jugadores-favoritos', async (req, res) => {
    const { jugador_api_id, nombre, apellido, posicion, equipo_nombre } = req.body;
    const { id } = req.params;

    if (!jugador_api_id) {
        return res.status(400).json({ error: 'jugador_api_id es requerido' });
    }

    try {
        // Asegurar que el usuario existe
        const [existe] = await conexion.execute('SELECT id FROM usuarios WHERE id = ?', [id]);
        if (existe.length === 0) {
            await conexion.execute(
                `INSERT INTO usuarios (id, nombre_usuario, email, password_hash)
                 VALUES (?, 'usuario_prueba', 'usuario_prueba@example.com', 'HASH_DEFAULT')`,
                [id]
            );
        }

        // Si se proveen datos del jugador, asegurar que exista en la tabla jugadores_nba
        if (nombre || apellido) {
            try {
                await conexion.execute(
                    `INSERT INTO jugadores_nba (id, nombre, apellido, posicion, equipo_nombre)
                     VALUES (?, ?, ?, ?, ?)
                     ON DUPLICATE KEY UPDATE
                        nombre = VALUES(nombre),
                        apellido = VALUES(apellido),
                        posicion = VALUES(posicion),
                        equipo_nombre = VALUES(equipo_nombre)`,
                    [Number(jugador_api_id) || 0, nombre || '', apellido || '', posicion || '', equipo_nombre || '']
                );
            } catch (errJug) {
                console.error('Aviso al insertar en jugadores_nba:', errJug.message);
            }
        }

        await conexion.execute(
            `INSERT INTO jugadores_favs_usuario (usuario_id, jugador_api_id)
             VALUES (?, ?)
             ON DUPLICATE KEY UPDATE fecha_agregado = CURRENT_TIMESTAMP`,
            [id, String(jugador_api_id)]
        );
        res.json({ mensaje: 'Jugador favorito guardado con éxito', jugador_api_id });
    } catch (error) {
        console.error('Error al guardar jugador favorito:', error.message);
        res.status(500).json({ error: 'No se pudo guardar el jugador favorito', detalle: error.message });
    }
});

app.delete('/api/usuarios/:id/jugadores-favoritos/:jugadorId', async (req, res) => {
    try {
        await conexion.execute(
            `DELETE FROM jugadores_favs_usuario 
             WHERE usuario_id = ? AND jugador_api_id = ?`,
            [req.params.id, req.params.jugadorId]
        );
        res.json({ mensaje: 'Jugador favorito eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar jugador favorito:', error.message);
        res.status(500).json({ error: 'No se pudo eliminar el jugador favorito' });
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

async function iniciarServidor() {
    try {
        // Verificar y crear base de datos / tablas si no existen
        await inicializarBaseDeDatos();
        console.log(`✅ Base de datos conectada y sincronizada.`);
    } catch (error) {
        console.error('\n⚠️ Advertencia al inicializar la base de datos:');
        console.error(error.message || error);
        console.log('💡 Continuando inicio del servidor Express...\n');
    }

    app.listen(PUERTO, () => {
        console.log(`\n=================================================`);
        console.log(`🚀 HoopZone backend iniciado en http://localhost:${PUERTO}`);
        console.log(`=================================================\n`);
    });
}

iniciarServidor();

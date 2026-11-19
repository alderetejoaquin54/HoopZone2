
import mysql from 'mysql2/promise';
import 'dotenv/config';
import { EQUIPOS_NBA_OFICIALES, JUGADORES_NBA_OFICIALES, PARTIDOS_NBA_INICIALES, NOTICIAS_NBA_INICIALES } from './datosNBA.js';

const dbConfig = {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'hoopzone_bd',
};

// Función para crear la base de datos y tablas automáticamente si no existen
export async function inicializarBaseDeDatos() {
    // 1. Conexión administrativa inicial sin especificar la base de datos
    const adminConexion = await mysql.createConnection({
        host: dbConfig.host,
        port: dbConfig.port,
        user: dbConfig.user,
        password: dbConfig.password,
    });

    console.log('Conectado al servidor MySQL. Verificando base de datos...');

    // 2. Crear la base de datos si no existe
    await adminConexion.query(
        `CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` 
         CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
    );

    await adminConexion.query(`USE \`${dbConfig.database}\`;`);

    // 2.1 Verificar si la tabla usuarios ya existe y responde correctamente
    let tablasListas = false;
    try {
        await adminConexion.query('SELECT 1 FROM usuarios LIMIT 1');
        tablasListas = true;
        console.log('✅ Las tablas ya están creadas y funcionando correctamente en MySQL.');
    } catch (error) {
        // Si no existe (código ER_NO_SUCH_TABLE), procedemos a crearlas
        tablasListas = false;
    }

    if (!tablasListas) {
        // 2.2 Obtener tablas que ya existen para no intentar recrearlas
        const [tablasExistentes] = await adminConexion.query(
            `SELECT TABLE_NAME FROM information_schema.tables WHERE TABLE_SCHEMA = ?`,
            [dbConfig.database]
        );
        const nombresTablas = tablasExistentes.map(t => (t.TABLE_NAME || t.table_name || Object.values(t)[0]).toLowerCase());

        const ejecutarSiNoExiste = async (nombre, query) => {
            if (nombresTablas.includes(nombre.toLowerCase())) {
                return;
            }
            try {
                await adminConexion.query(query);
            } catch (error) {
                // Ignorar si ya existía (código 1050 de MySQL/MariaDB)
                if (error.errno === 1050 || error.code === 'ER_TABLE_EXISTS_ERROR') {
                    return;
                }
                throw error;
            }
        };

        // 3. Crear tabla de usuarios
        await ejecutarSiNoExiste('usuarios', `
            CREATE TABLE usuarios (
                id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
                nombre_usuario VARCHAR(40) NOT NULL UNIQUE,
                email VARCHAR(150) NOT NULL UNIQUE,
                password_hash VARCHAR(255) NOT NULL,
                fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                activo TINYINT(1) NOT NULL DEFAULT 1,
                PRIMARY KEY (id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 4. Crear tabla de preferencias de usuario
        await ejecutarSiNoExiste('preferencias_usuario', `
            CREATE TABLE preferencias_usuario (
                usuario_id INT(10) UNSIGNED NOT NULL,
                tema ENUM('claro','oscuro','sistema') NOT NULL DEFAULT 'sistema',
                idioma VARCHAR(10) NOT NULL DEFAULT 'es',
                notificaciones_activadas TINYINT(1) NOT NULL DEFAULT 1,
                PRIMARY KEY (usuario_id),
                CONSTRAINT fk_preferencias_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 5. Crear tabla de equipos favoritos
        await ejecutarSiNoExiste('equipos_favs_usuario', `
            CREATE TABLE equipos_favs_usuario (
                usuario_id INT(10) UNSIGNED NOT NULL,
                equipo_api_id VARCHAR(50) NOT NULL,
                fecha_agregado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (usuario_id, equipo_api_id),
                CONSTRAINT fk_equipos_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 6. Crear tabla de jugadores favoritos
        await ejecutarSiNoExiste('jugadores_favs_usuario', `
            CREATE TABLE jugadores_favs_usuario (
                usuario_id INT(10) UNSIGNED NOT NULL,
                jugador_api_id VARCHAR(50) NOT NULL,
                fecha_agregado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (usuario_id, jugador_api_id),
                CONSTRAINT fk_jugadores_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);
    }

    // Tablas de caché para la API de BallDontLie (Equipos y Jugadores)
    const [tablasAPI] = await adminConexion.query(
        `SELECT TABLE_NAME FROM information_schema.tables WHERE TABLE_SCHEMA = ?`,
        [dbConfig.database]
    );
    const nombresActuales = tablasAPI.map(t => (t.TABLE_NAME || t.table_name || Object.values(t)[0]).toLowerCase());

    if (!nombresActuales.includes('equipos_nba')) {
        await adminConexion.query(`
            CREATE TABLE equipos_nba (
                id INT NOT NULL,
                nombre VARCHAR(50) NOT NULL,
                nombre_completo VARCHAR(100) NOT NULL,
                abreviatura VARCHAR(10) NOT NULL,
                ciudad VARCHAR(50) NOT NULL,
                conferencia VARCHAR(20) NOT NULL,
                division VARCHAR(30) NOT NULL,
                victorias INT DEFAULT 0,
                derrotas INT DEFAULT 0,
                pct DECIMAL(4,3) DEFAULT 0.000,
                racha VARCHAR(10) DEFAULT '',
                actualizado_el TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);
        console.log('✅ Tabla equipos_nba creada.');
    } else {
        // Asegurar que las columnas de estadísticas existan
        try {
            await adminConexion.query(`
                ALTER TABLE equipos_nba 
                ADD COLUMN IF NOT EXISTS victorias INT DEFAULT 0,
                ADD COLUMN IF NOT EXISTS derrotas INT DEFAULT 0,
                ADD COLUMN IF NOT EXISTS pct DECIMAL(4,3) DEFAULT 0.000,
                ADD COLUMN IF NOT EXISTS racha VARCHAR(10) DEFAULT ''
            `);
        } catch (e) {
            // Ignorar si la versión de MySQL no soporta IF NOT EXISTS en ALTER
        }
    }

    // Sincronizar equipos oficiales con la temporada actual en MySQL
    for (const eq of EQUIPOS_NBA_OFICIALES) {
        await adminConexion.query(`
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
    console.log('✅ 30 equipos oficiales de la NBA sincronizados con la temporada actual en MySQL.');

    if (!nombresActuales.includes('jugadores_nba')) {
        await adminConexion.query(`
            CREATE TABLE jugadores_nba (
                id INT NOT NULL,
                nombre VARCHAR(50) NOT NULL,
                apellido VARCHAR(50) NOT NULL,
                posicion VARCHAR(20),
                numero_camiseta VARCHAR(10),
                equipo_id INT,
                equipo_nombre VARCHAR(100),
                pais VARCHAR(50),
                altura VARCHAR(20),
                actualizado_el TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);
        console.log('✅ Tabla jugadores_nba creada.');
    }

    // Poblar jugadores oficiales si la tabla está vacía
    const [filasJug] = await adminConexion.query('SELECT COUNT(*) AS total FROM jugadores_nba');
    if (filasJug[0] && filasJug[0].total === 0) {
        for (const j of JUGADORES_NBA_OFICIALES) {
            await adminConexion.query(`
                INSERT INTO jugadores_nba (id, nombre, apellido, posicion, numero_camiseta, equipo_id, equipo_nombre, pais, altura)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                equipo_nombre = VALUES(equipo_nombre),
                posicion = VALUES(posicion)
            `, [j.id, j.nombre, j.apellido, j.posicion, j.numero_camiseta, j.equipo_id, j.equipo_nombre, j.pais, j.altura]);
        }
        console.log('✅ Jugadores estrella de la NBA cargados en MySQL.');
    }

    // 8. Crear y poblar tabla de partidos de la NBA
    if (!nombresActuales.includes('partidos_nba')) {
        await adminConexion.query(`
            CREATE TABLE partidos_nba (
                id INT AUTO_INCREMENT NOT NULL,
                estado VARCHAR(20) NOT NULL DEFAULT 'upcoming',
                etiqueta_estado VARCHAR(50) NOT NULL,
                arena VARCHAR(100) NOT NULL,
                equipo_visita VARCHAR(100) NOT NULL,
                record_visita VARCHAR(20) NOT NULL,
                puntos_visita INT DEFAULT NULL,
                equipo_local VARCHAR(100) NOT NULL,
                record_local VARCHAR(20) NOT NULL,
                puntos_local INT DEFAULT NULL,
                hora VARCHAR(20) NOT NULL,
                transmision VARCHAR(50) NOT NULL,
                PRIMARY KEY (id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);
        console.log('✅ Tabla partidos_nba creada.');
    }

    const [filasPartidos] = await adminConexion.query('SELECT COUNT(*) AS total FROM partidos_nba');
    if (filasPartidos[0] && filasPartidos[0].total === 0) {
        for (const p of PARTIDOS_NBA_INICIALES) {
            await adminConexion.query(`
                INSERT INTO partidos_nba (id, estado, etiqueta_estado, arena, equipo_visita, record_visita, puntos_visita, equipo_local, record_local, puntos_local, hora, transmision)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [p.id, p.estado, p.etiqueta_estado, p.arena, p.equipo_visita, p.record_visita, p.puntos_visita, p.equipo_local, p.record_local, p.puntos_local, p.hora, p.transmision]);
        }
        console.log('✅ Partidos oficiales de la NBA cargados en MySQL.');
    }

    // 9. Crear y poblar tabla de noticias de la NBA
    if (!nombresActuales.includes('noticias_nba')) {
        await adminConexion.query(`
            CREATE TABLE noticias_nba (
                id INT AUTO_INCREMENT NOT NULL,
                titulo VARCHAR(255) NOT NULL,
                resumen TEXT NOT NULL,
                categoria VARCHAR(50) NOT NULL,
                fecha VARCHAR(50) NOT NULL,
                autor VARCHAR(100) DEFAULT 'HoopZone Redacción',
                PRIMARY KEY (id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);
        console.log('✅ Tabla noticias_nba creada.');
    }

    const [filasNoticias] = await adminConexion.query('SELECT COUNT(*) AS total FROM noticias_nba');
    if (filasNoticias[0] && filasNoticias[0].total === 0) {
        for (const n of NOTICIAS_NBA_INICIALES) {
            await adminConexion.query(`
                INSERT INTO noticias_nba (id, titulo, resumen, categoria, fecha, autor)
                VALUES (?, ?, ?, ?, ?, ?)
            `, [n.id, n.titulo, n.resumen, n.categoria, n.fecha, n.autor]);
        }
        console.log('✅ Noticias de la NBA cargadas en MySQL.');
    }

    // 10. Insertar usuario de prueba inicial si la tabla está vacía
    try {
        const [filas] = await adminConexion.query('SELECT COUNT(*) AS total FROM usuarios');
        if (filas[0] && filas[0].total === 0) {
            await adminConexion.query(`
                INSERT IGNORE INTO usuarios (id, nombre_usuario, email, password_hash)
                VALUES (1, 'usuario_prueba', 'usuario_prueba@example.com', 'HASH_TEMPORAL_NO_VALIDO');
            `);

            await adminConexion.query(`
                INSERT IGNORE INTO preferencias_usuario (usuario_id, tema, idioma, notificaciones_activadas)
                VALUES (1, 'sistema', 'es', 1);
            `);
            console.log('✅ Usuario inicial de prueba (id: 1) creado automáticamente.');
        }
    } catch (err) {
        // Ignorar si hubo algún conflicto no crítico al verificar usuario de prueba
    }

    await adminConexion.end();
    console.log(`✅ Base de datos '${dbConfig.database}' y tablas listas para usar.`);
}

const conexion = mysql.createPool({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default conexion;

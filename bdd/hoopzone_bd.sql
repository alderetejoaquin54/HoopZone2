-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-10-2026 a las 00:12:21
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `hoopzone_bd`
--
CREATE DATABASE IF NOT EXISTS `hoopzone_bd` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `hoopzone_bd`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos_favs_usuario`
--

CREATE TABLE `equipos_favs_usuario` (
  `usuario_id` int(10) UNSIGNED NOT NULL,
  `equipo_api_id` varchar(50) NOT NULL,
  `fecha_agregado` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jugadores_favs_usuario`
--

CREATE TABLE `jugadores_favs_usuario` (
  `usuario_id` int(10) UNSIGNED NOT NULL,
  `jugador_api_id` varchar(50) NOT NULL,
  `fecha_agregado` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preferencias_usuario`
--

CREATE TABLE `preferencias_usuario` (
  `usuario_id` int(10) UNSIGNED NOT NULL,
  `tema` enum('claro','oscuro','sistema') NOT NULL DEFAULT 'sistema',
  `idioma` varchar(10) NOT NULL DEFAULT 'es',
  `notificaciones_activadas` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre_usuario` varchar(40) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp(),
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre_usuario`, `email`, `password_hash`, `fecha_registro`, `activo`) VALUES
(1, 'usuario_prueba', 'usuario_prueba@example.com', 'HASH_TEMPORAL_NO_VALIDO', '2026-10-17 01:02:27', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `equipos_favs_usuario`
--
ALTER TABLE `equipos_favs_usuario`
  ADD PRIMARY KEY (`usuario_id`,`equipo_api_id`);

--
-- Indices de la tabla `jugadores_favs_usuario`
--
ALTER TABLE `jugadores_favs_usuario`
  ADD PRIMARY KEY (`usuario_id`,`jugador_api_id`);

--
-- Indices de la tabla `preferencias_usuario`
--
ALTER TABLE `preferencias_usuario`
  ADD PRIMARY KEY (`usuario_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre_usuario` (`nombre_usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `equipos_favs_usuario`
--
ALTER TABLE `equipos_favs_usuario`
  ADD CONSTRAINT `equipos_favs_usuario_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `jugadores_favs_usuario`
--
ALTER TABLE `jugadores_favs_usuario`
  ADD CONSTRAINT `jugadores_favs_usuario_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `preferencias_usuario`
--
ALTER TABLE `preferencias_usuario`
  ADD CONSTRAINT `preferencias_usuario_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos_nba`
--

CREATE TABLE IF NOT EXISTS `equipos_nba` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `nombre_completo` varchar(100) NOT NULL,
  `abreviatura` varchar(10) NOT NULL,
  `ciudad` varchar(50) NOT NULL,
  `conferencia` varchar(20) NOT NULL,
  `division` varchar(30) NOT NULL,
  `victorias` int(11) DEFAULT 0,
  `derrotas` int(11) DEFAULT 0,
  `pct` decimal(4,3) DEFAULT 0.000,
  `racha` varchar(10) DEFAULT '',
  `actualizado_el` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `equipos_nba` (`id`, `nombre`, `nombre_completo`, `abreviatura`, `ciudad`, `conferencia`, `division`, `victorias`, `derrotas`, `pct`, `racha`) VALUES
(4, 'Cavaliers', 'Cleveland Cavaliers', 'CLE', 'Cleveland', 'Este', 'Central', 64, 18, 0.780, 'G4'),
(1, 'Celtics', 'Boston Celtics', 'BOS', 'Boston', 'Este', 'Atlántico', 61, 21, 0.744, 'G2'),
(2, 'Knicks', 'New York Knicks', 'NYK', 'New York', 'Este', 'Atlántico', 51, 31, 0.622, 'G1'),
(6, 'Pacers', 'Indiana Pacers', 'IND', 'Indiana', 'Este', 'Central', 50, 32, 0.610, 'G3'),
(3, 'Bucks', 'Milwaukee Bucks', 'MIL', 'Milwaukee', 'Este', 'Central', 48, 34, 0.585, 'P1'),
(15, 'Pistons', 'Detroit Pistons', 'DET', 'Detroit', 'Este', 'Central', 44, 38, 0.537, 'G2'),
(5, 'Magic', 'Orlando Magic', 'ORL', 'Orlando', 'Este', 'Sureste', 41, 41, 0.500, 'P1'),
(10, 'Hawks', 'Atlanta Hawks', 'ATL', 'Atlanta', 'Este', 'Sureste', 40, 42, 0.488, 'G1'),
(9, 'Bulls', 'Chicago Bulls', 'CHI', 'Chicago', 'Este', 'Central', 39, 43, 0.476, 'P2'),
(8, 'Heat', 'Miami Heat', 'MIA', 'Miami', 'Este', 'Sureste', 37, 45, 0.451, 'P3'),
(12, 'Raptors', 'Toronto Raptors', 'TOR', 'Toronto', 'Este', 'Atlántico', 30, 52, 0.366, 'P1'),
(11, 'Nets', 'Brooklyn Nets', 'BKN', 'Brooklyn', 'Este', 'Atlántico', 26, 56, 0.317, 'P4'),
(7, '76ers', 'Philadelphia 76ers', 'PHI', 'Philadelphia', 'Este', 'Atlántico', 24, 58, 0.293, 'P2'),
(13, 'Hornets', 'Charlotte Hornets', 'CHA', 'Charlotte', 'Este', 'Sureste', 19, 63, 0.232, 'P5'),
(14, 'Wizards', 'Washington Wizards', 'WAS', 'Washington', 'Este', 'Sureste', 18, 64, 0.220, 'P3'),
(16, 'Thunder', 'Oklahoma City Thunder', 'OKC', 'Oklahoma City', 'Oeste', 'Noroeste', 68, 14, 0.829, 'G6'),
(26, 'Rockets', 'Houston Rockets', 'HOU', 'Houston', 'Oeste', 'Suroeste', 52, 30, 0.634, 'G3'),
(23, 'Lakers', 'Los Angeles Lakers', 'LAL', 'Los Angeles', 'Oeste', 'Pacífico', 50, 32, 0.610, 'G2'),
(17, 'Nuggets', 'Denver Nuggets', 'DEN', 'Denver', 'Oeste', 'Noroeste', 50, 32, 0.610, 'P1'),
(19, 'Clippers', 'LA Clippers', 'LAC', 'Los Angeles', 'Oeste', 'Pacífico', 50, 32, 0.610, 'G1'),
(18, 'Timberwolves', 'Minnesota Timberwolves', 'MIN', 'Minnesota', 'Oeste', 'Noroeste', 49, 33, 0.598, 'G2'),
(25, 'Warriors', 'Golden State Warriors', 'GSW', 'Golden State', 'Oeste', 'Pacífico', 48, 34, 0.585, 'G1'),
(28, 'Grizzlies', 'Memphis Grizzlies', 'MEM', 'Memphis', 'Oeste', 'Suroeste', 48, 34, 0.585, 'P1'),
(24, 'Kings', 'Sacramento Kings', 'SAC', 'Sacramento', 'Oeste', 'Pacífico', 40, 42, 0.488, 'P2'),
(20, 'Mavericks', 'Dallas Mavericks', 'DAL', 'Dallas', 'Oeste', 'Suroeste', 39, 43, 0.476, 'P1'),
(21, 'Suns', 'Phoenix Suns', 'PHX', 'Phoenix', 'Oeste', 'Pacífico', 36, 46, 0.439, 'P3'),
(30, 'Trail Blazers', 'Portland Trail Blazers', 'POR', 'Portland', 'Oeste', 'Noroeste', 36, 46, 0.439, 'G1'),
(29, 'Spurs', 'San Antonio Spurs', 'SAS', 'San Antonio', 'Oeste', 'Suroeste', 34, 48, 0.415, 'G2'),
(22, 'Pelicans', 'New Orleans Pelicans', 'NOP', 'New Orleans', 'Oeste', 'Suroeste', 21, 61, 0.256, 'P6'),
(27, 'Jazz', 'Utah Jazz', 'UTA', 'Utah', 'Oeste', 'Noroeste', 17, 65, 0.207, 'P4')
ON DUPLICATE KEY UPDATE 
  victorias=VALUES(victorias),
  derrotas=VALUES(derrotas),
  pct=VALUES(pct),
  racha=VALUES(racha);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jugadores_nba`
--

CREATE TABLE IF NOT EXISTS `jugadores_nba` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `posicion` varchar(20) DEFAULT NULL,
  `numero_camiseta` varchar(10) DEFAULT NULL,
  `equipo_id` int(11) DEFAULT NULL,
  `equipo_nombre` varchar(100) DEFAULT NULL,
  `pais` varchar(50) DEFAULT NULL,
  `altura` varchar(20) DEFAULT NULL,
  `actualizado_el` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `jugadores_nba` (`id`, `nombre`, `apellido`, `posicion`, `numero_camiseta`, `equipo_id`, `equipo_nombre`, `pais`, `altura`) VALUES
(237, 'LeBron', 'James', 'F', '23', 23, 'Los Angeles Lakers', 'USA', '6-9'),
(115, 'Stephen', 'Curry', 'G', '30', 25, 'Golden State Warriors', 'USA', '6-2'),
(132, 'Luka', 'Doncic', 'G-F', '77', 20, 'Dallas Mavericks', 'Slovenia', '6-7'),
(246, 'Nikola', 'Jokic', 'C', '15', 17, 'Denver Nuggets', 'Serbia', '6-11'),
(15, 'Giannis', 'Antetokounmpo', 'F', '34', 3, 'Milwaukee Bucks', 'Greece', '6-11'),
(434, 'Jayson', 'Tatum', 'F-G', '0', 1, 'Boston Celtics', 'USA', '6-8'),
(140, 'Kevin', 'Durant', 'F', '35', 21, 'Phoenix Suns', 'USA', '6-11'),
(178, 'Shai', 'Gilgeous-Alexander', 'G', '2', 16, 'Oklahoma City Thunder', 'Canada', '6-6'),
(145, 'Joel', 'Embiid', 'C-F', '21', 7, 'Philadelphia 76ers', 'Cameroon', '7-0'),
(117, 'Anthony', 'Davis', 'F-C', '3', 23, 'Los Angeles Lakers', 'USA', '6-10')
ON DUPLICATE KEY UPDATE id=id;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `partidos_nba`
--

CREATE TABLE IF NOT EXISTS `partidos_nba` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estado` varchar(20) NOT NULL DEFAULT 'upcoming',
  `etiqueta_estado` varchar(50) NOT NULL,
  `arena` varchar(100) NOT NULL,
  `equipo_visita` varchar(100) NOT NULL,
  `record_visita` varchar(20) NOT NULL,
  `puntos_visita` int(11) DEFAULT NULL,
  `equipo_local` varchar(100) NOT NULL,
  `record_local` varchar(20) NOT NULL,
  `puntos_local` int(11) DEFAULT NULL,
  `hora` varchar(20) NOT NULL,
  `transmision` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `partidos_nba` (`id`, `estado`, `etiqueta_estado`, `arena`, `equipo_visita`, `record_visita`, `puntos_visita`, `equipo_local`, `record_local`, `puntos_local`, `hora`, `transmision`) VALUES
(1, 'live', '🔴 EN VIVO - Q3 04:15', 'TD Garden, Boston', 'Los Angeles Lakers', '47-35', 78, 'Boston Celtics', '64-18', 84, 'Q3', 'ESPN / League Pass'),
(2, 'upcoming', 'HOY 21:30 hs', 'Chase Center, San Francisco', 'Miami Heat', '46-36', NULL, 'Golden State Warriors', '46-36', NULL, '21:30', 'NBA TV'),
(3, 'upcoming', 'HOY 23:00 hs', 'Ball Arena, Denver', 'Phoenix Suns', '49-33', NULL, 'Denver Nuggets', '57-25', NULL, '23:00', 'ESPN'),
(4, 'upcoming', 'MAÑANA 20:00 hs', 'Fiserv Forum, Milwaukee', 'Philadelphia 76ers', '47-35', NULL, 'Milwaukee Bucks', '49-33', NULL, '20:00', 'TNT'),
(5, 'upcoming', 'MAÑANA 22:30 hs', 'American Airlines Center', 'LA Clippers', '51-31', NULL, 'Dallas Mavericks', '50-32', NULL, '22:30', 'ESPN'),
(6, 'final', 'FINAL', 'Gainbridge Fieldhouse', 'Chicago Bulls', '39-43', 108, 'Indiana Pacers', '47-35', 114, 'FINAL', 'Finalizado'),
(7, 'final', 'FINAL', 'Frost Bank Center', 'Sacramento Kings', '46-36', 118, 'San Antonio Spurs', '22-60', 122, 'FINAL', 'Finalizado'),
(8, 'final', 'FINAL', 'State Farm Arena', 'Orlando Magic', '47-35', 119, 'Atlanta Hawks', '36-46', 105, 'FINAL', 'Finalizado'),
(9, 'final', 'FINAL', 'FedExForum', 'New Orleans Pelicans', '49-33', 110, 'Memphis Grizzlies', '27-55', 98, 'FINAL', 'Finalizado')
ON DUPLICATE KEY UPDATE id=id;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `noticias_nba`
--

CREATE TABLE IF NOT EXISTS `noticias_nba` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `resumen` text NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `fecha` varchar(50) NOT NULL,
  `autor` varchar(100) DEFAULT 'HoopZone Redacción',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `noticias_nba` (`id`, `titulo`, `resumen`, `categoria`, `fecha`, `autor`) VALUES
(1, 'Boston Celtics aseguran el mejor récord de la Conferencia Este', 'Con una actuación dominante de Jayson Tatum y Jaylen Brown, los Celtics consolidan su posición como máximos favoritos hacia los Playoffs.', 'DESTACADO', 'Hoy', 'HoopZone Redacción'),
(2, 'Luka Dončić marca otro récord histórico de triple-doble', 'La estrella eslovena de los Dallas Mavericks sigue deslumbrando a la liga liderando en anotación y asistencias con números de MVP.', 'JUGADORES', 'Hoy', 'HoopZone Redacción'),
(3, 'Victor Wembanyama encabeza la carrera por el Jugador Defensivo del Año', 'El prodigio francés de los Spurs promedia más de 3.6 bloqueos por noche y revoluciona la pintura defensiva en su temporada.', 'ESTADÍSTICAS', 'Ayer', 'HoopZone Redacción'),
(4, 'Golden State Warriors y Los Angeles Lakers definen posiciones de Play-In', 'Stephen Curry y LeBron James protagonizan una batalla cabeza a cabeza en la recta final de la Conferencia Oeste.', 'PLAYOFFS', 'Ayer', 'HoopZone Redacción'),
(5, 'Nikola Jokić y Shai Gilgeous-Alexander en una carrera reñida por el MVP', 'A pocas semanas de los Playoffs, las dos grandes figuras del Oeste compiten voto a voto por el premio más codiciado de la temporada regular.', 'ACTUALIDAD', 'Hace 2 días', 'HoopZone Redacción')
ON DUPLICATE KEY UPDATE id=id;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

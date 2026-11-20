import { Platform, NativeModules } from 'react-native';

export const IP_LOCAL = '10.0.4.42';

export const getApiUrl = () => {
  if (Platform.OS === 'web') {
    return 'http://localhost:3000';
  }

  // Detectar automáticamente la IP del host donde corre Metro/Expo
  try {
    const scriptURL = NativeModules.SourceCode?.scriptURL;
    if (scriptURL) {
      const address = scriptURL.split('://')[1]?.split('/')[0]?.split(':')[0];
      if (address && address !== 'localhost' && address !== '127.0.0.1') {
        return `http://${address}:3000`;
      }
    }
  } catch (e) {
    // Si no está disponible, continuar con la IP de respaldo
  }

  return `http://${IP_LOCAL}:3000`;
};

export const API_URL = getApiUrl();

const fetchConTimeout = async (url, opciones = {}, tiempoMs = 8000) => {
  const controller = new AbortController();
  const idTimeout = setTimeout(() => controller.abort(), tiempoMs);

  try {
    const respuesta = await fetch(url, {
      ...opciones,
      signal: controller.signal,
    });
    clearTimeout(idTimeout);
    return respuesta;
  } catch (error) {
    clearTimeout(idTimeout);
    throw error;
  }
};

export async function comprobarBackend() {
  const respuesta = await fetchConTimeout(`${getApiUrl()}/api/salud`);

  if (!respuesta.ok) {
    throw new Error('El servidor respondió con un error.');
  }

  return await respuesta.json();
}

export async function obtenerUsuarios() {
  const respuesta = await fetchConTimeout(`${getApiUrl()}/api/usuarios`);

  if (!respuesta.ok) {
    throw new Error('No se pudieron obtener los usuarios.');
  }

  return await respuesta.json();
}

export async function obtenerPreferenciasUsuario(id = 1) {
  const respuesta = await fetchConTimeout(`${getApiUrl()}/api/usuarios/${id}/preferencias`);

  if (!respuesta.ok) {
    throw new Error('No se pudieron obtener las preferencias.');
  }

  return await respuesta.json();
}

export async function actualizarUsuario(id, datos) {
  const respuesta = await fetchConTimeout(`${getApiUrl()}/api/usuarios/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  });

  if (!respuesta.ok) {
    const errorData = await respuesta.json().catch(() => ({}));
    throw new Error(errorData.error || 'No se pudo actualizar el usuario.');
  }

  return await respuesta.json();
}

export async function actualizarPreferenciasUsuario(id, preferencias) {
  const respuesta = await fetchConTimeout(`${getApiUrl()}/api/usuarios/${id}/preferencias`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(preferencias),
  });

  if (!respuesta.ok) {
    const errorData = await respuesta.json().catch(() => ({}));
    throw new Error(errorData.error || 'No se pudieron actualizar las preferencias.');
  }

  return await respuesta.json();
}

export async function obtenerEquiposFavoritos(id = 1) {
  const respuesta = await fetchConTimeout(`${getApiUrl()}/api/usuarios/${id}/equipos-favoritos`);

  if (!respuesta.ok) {
    throw new Error('No se pudieron obtener los equipos favoritos.');
  }

  return await respuesta.json();
}

export async function guardarEquipoFavorito(id = 1, equipoApiId) {
  const respuesta = await fetchConTimeout(`${getApiUrl()}/api/usuarios/${id}/equipos-favoritos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ equipo_api_id: equipoApiId }),
  });

  if (!respuesta.ok) {
    const errorData = await respuesta.json().catch(() => ({}));
    throw new Error(errorData.error || 'No se pudo guardar el equipo favorito.');
  }

  return await respuesta.json();
}

// ==========================================
// API BALLDONTLIE - ENDPOINTS NBA
// ==========================================

export async function obtenerEquiposNBA(sincronizar = false) {
  const url = `${getApiUrl()}/api/nba/equipos${sincronizar ? '?sincronizar=true' : ''}`;
  const respuesta = await fetchConTimeout(url, {}, 8000);

  if (!respuesta.ok) {
    throw new Error('No se pudieron obtener los equipos de la NBA.');
  }

  return await respuesta.json();
}

export async function obtenerPosicionesNBA() {
  const respuesta = await fetchConTimeout(`${getApiUrl()}/api/nba/posiciones`, {}, 8000);

  if (!respuesta.ok) {
    throw new Error('No se pudieron obtener las posiciones de la NBA.');
  }

  return await respuesta.json();
}

export async function obtenerLideresEstadisticas() {
  const respuesta = await fetchConTimeout(`${getApiUrl()}/api/nba/estadisticas/lideres`, {}, 8000);

  if (!respuesta.ok) {
    throw new Error('No se pudieron obtener los líderes de estadísticas.');
  }

  return await respuesta.json();
}

export async function obtenerJugadoresNBA(buscar = '') {
  const query = buscar ? `?buscar=${encodeURIComponent(buscar)}` : '';
  const respuesta = await fetchConTimeout(`${getApiUrl()}/api/nba/jugadores${query}`, {}, 8000);

  if (!respuesta.ok) {
    throw new Error('No se pudieron obtener los jugadores de la NBA.');
  }

  return await respuesta.json();
}

export async function obtenerPartidosNBA() {
  const respuesta = await fetchConTimeout(`${getApiUrl()}/api/nba/partidos`, {}, 8000);

  if (!respuesta.ok) {
    throw new Error('No se pudieron obtener los partidos de la NBA.');
  }

  return await respuesta.json();
}

export async function obtenerJugadoresFavoritos(id = 1) {
  const respuesta = await fetchConTimeout(`${getApiUrl()}/api/usuarios/${id}/jugadores-favoritos`);

  if (!respuesta.ok) {
    throw new Error('No se pudieron obtener los jugadores favoritos.');
  }

  return await respuesta.json();
}

export async function guardarJugadorFavorito(id = 1, jugadorId, datosExtra = {}) {
  const respuesta = await fetchConTimeout(`${getApiUrl()}/api/usuarios/${id}/jugadores-favoritos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jugador_api_id: String(jugadorId),
      ...datosExtra,
    }),
  });

  if (!respuesta.ok) {
    const errorData = await respuesta.json().catch(() => ({}));
    throw new Error(errorData.error || 'No se pudo guardar el jugador favorito.');
  }

  return await respuesta.json();
}

export async function eliminarJugadorFavorito(id = 1, jugadorId) {
  const respuesta = await fetchConTimeout(
    `${getApiUrl()}/api/usuarios/${id}/jugadores-favoritos/${jugadorId}`,
    { method: 'DELETE' }
  );

  if (!respuesta.ok) {
    throw new Error('No se pudo eliminar el jugador favorito.');
  }

  return await respuesta.json();
}

export async function obtenerNoticiasNBA() {
  const respuesta = await fetchConTimeout(`${getApiUrl()}/api/nba/noticias`, {}, 8000);

  if (!respuesta.ok) {
    throw new Error('No se pudieron obtener las noticias.');
  }

  return await respuesta.json();
}

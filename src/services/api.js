import { Platform } from 'react-native';

// Configuración de la URL del Backend:
// - Si estás probando en la Web: usa localhost:3000
// - Si estás usando Expo Go en un celular físico conectado a la misma red Wi-Fi: usa la IP local de tu PC (10.0.0.169)
// - Si estás en emulador de Android: 10.0.2.2:3000
export const IP_LOCAL = '10.0.0.169';

export const getApiUrl = () => {
  if (Platform.OS === 'web') {
    return 'http://localhost:3000';
  }
  return `http://${IP_LOCAL}:3000`;
};

export const API_URL = getApiUrl();

const fetchConTimeout = async (url, opciones = {}, tiempoMs = 5000) => {
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
  const respuesta = await fetchConTimeout(`${API_URL}/api/salud`);

  if (!respuesta.ok) {
    throw new Error('El servidor respondió con un error.');
  }

  return await respuesta.json();
}

export async function obtenerUsuarios() {
  const respuesta = await fetchConTimeout(`${API_URL}/api/usuarios`);

  if (!respuesta.ok) {
    throw new Error('No se pudieron obtener los usuarios.');
  }

  return await respuesta.json();
}

export async function obtenerPreferenciasUsuario(id = 1) {
  const respuesta = await fetchConTimeout(`${API_URL}/api/usuarios/${id}/preferencias`);

  if (!respuesta.ok) {
    throw new Error('No se pudieron obtener las preferencias.');
  }

  return await respuesta.json();
}

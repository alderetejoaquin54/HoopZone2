
const API_URL = 'http://10.0.4.42:3000';

export async function comprobarBackend() {
  const respuesta = await fetch(`${API_URL}/api/salud`);

  if (!respuesta.ok) {
    throw new Error('El servidor respondió con un error.');
  }

  return await respuesta.json();
}

export async function obtenerUsuarios() {
  const respuesta = await fetch(`${API_URL}/api/usuarios`);

  if (!respuesta.ok) {
    throw new Error('No se pudieron obtener los usuarios.');
  }

  return await respuesta.json();
}

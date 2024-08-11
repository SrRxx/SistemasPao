export const GuardarSesionLocal = (usuario) => {
  try {
    const usuarioJson = JSON.stringify(usuario);
    localStorage.setItem("sesion", usuarioJson);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

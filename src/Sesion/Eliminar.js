export const eliminarSesionLocal = () => {
  try {
    localStorage.removeItem("sesion");

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

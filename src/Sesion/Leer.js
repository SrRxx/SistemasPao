export const LeerSesionLocal = () => {
  try {
    const sesionJson = localStorage.getItem("sesion");
    const sesion = JSON.parse(sesionJson);

    return sesion;
  } catch (error) {
    console.error(error);
    return null;
  }
};

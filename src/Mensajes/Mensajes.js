import { toasts } from "svelte-toasts";

export const MensajeCrear = ({
  titulo = "Prueba",
  descripcion = "Prueba",
  duracion = 3000,
  tipo = "info",
}) => {
  toasts.add({
    title: titulo,
    description: descripcion,
    duration: duracion,
    placement: "bottom-right",
    type: tipo,
    theme: "dark",
    placement: "bottom-right",
    onClick: () => {},
    onRemove: () => {},
  });
};

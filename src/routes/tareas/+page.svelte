<script>
  import { user } from "./../../stores/user.js";
  import { db } from "./../../Firebase/firebase.js";
  import { onMount } from "svelte";
  import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    orderBy,
    query,
  } from "firebase/firestore";
  import { MensajeCrear } from "../../Mensajes/Mensajes.js";

  let tarea = {
    titulo: "",
    descripcion: "",
    prioridad: 1,
    fecha: null,
    id: null,
  };

  $: cargando = true;

  let tareas = [];

  let order_by = "prioridad";
  let order_by2 = "desc";

  async function obtenerTareas() {
    const q = query(collection(db, "tareas"), orderBy(order_by, order_by2));
    const querySnapshot = await getDocs(q);
    tareas = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    if (tareas != null || tareas != undefined) {
      cargando = false;
    }
  }

  async function agregarTarea(datos) {
    await addDoc(collection(db, "tareas"), datos);
    await obtenerTareas();
  }

  async function actualizarTarea(datos) {
    console.log(datos);
    

    const tareaRef = doc(db, "tareas", datos.id);
    await updateDoc(tareaRef, {
      titulo: datos.titulo,
      descripcion: datos.descripcion,
      prioridad: datos.prioridad,
      fecha: datos.fecha
    });
    await obtenerTareas();
  }

  async function eliminarTarea(id) {
    await deleteDoc(doc(db, "tareas", id));
    await obtenerTareas();

    tarea.id = null;
  }

  const LimpiarDatos = () => {
    tarea.titulo = "";
    tarea.descripcion = "";
    tarea.prioridad = 1;
    tarea.fecha = null;
    tarea.id = null;
  };

  const FuncionCrearTarea = (e) => {
    e.preventDefault();

    if (
      tarea.titulo.length > 0 &&
      tarea.descripcion.length > 0 &&
      tarea.prioridad > 0 &&
      tarea.fecha != null
    ) {
      agregarTarea(tarea);

      MensajeCrear({
        titulo: "Tarea creada",
        descripcion: "La tarea se ha creado correctamente!",
        duracion: 5000,
        tipo: "success",
      });

      LimpiarDatos();
    } else {
      MensajeCrear({
        titulo: "Campos requeridos",
        descripcion: "Los campos son requeridos, por favor llenarlos",
        duracion: 5000,
        tipo: "warning",
      });
    }
  };

  const FuncionOrdenarPor = () => {
    obtenerTareas();
  };

  const FuncionOrdenarDA = () => {
    obtenerTareas();
  };

  const FuncionEditarTarea = (e) => {
    e.preventDefault();

    if (
      tarea.titulo.length > 0 &&
      tarea.descripcion.length > 0 &&
      tarea.prioridad > 0 &&
      tarea.fecha != null
    ) {
      actualizarTarea(tarea);

      MensajeCrear({
        titulo: "Tarea actualizada",
        descripcion: "La tarea se ha actualizado correctamente!",
        duracion: 5000,
        tipo: "success",
      });

      LimpiarDatos();
    } else {
      MensajeCrear({
        titulo: "Campos requeridos",
        descripcion: "Los campos son requeridos, por favor llenarlos",
        duracion: 5000,
        tipo: "warning",
      });
    }
  };

  const FuncionEliminar = () => {
    const confirmar = confirm("¿Desea eliminar esta tarea?");

    if (confirmar) {
      eliminarTarea(tarea.id);
    }
  };

  onMount(() => {
    obtenerTareas();
  });
</script>

<h1>Tareas</h1>

<button
  type="button"
  class="btn btn-primary"
  data-bs-toggle="modal"
  data-bs-target="#crearTarea"
>
  Crear tarea
</button>

<!-- Modal Crear tarea -->
<div
  class="modal fade"
  id="crearTarea"
  tabindex="-1"
  aria-labelledby="crearTareaLabel"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="crearTareaLabel">Crear tarea</h1>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <form action="" on:submit={FuncionCrearTarea}>
          <div class="mb-3">
            <label for="titulo">Titulo tarea:</label>
            <input
              type="text"
              name="titulo"
              id="titulo"
              bind:value={tarea.titulo}
              class="form-control"
              required
            />
          </div>
          <div class="mb-3">
            <label for="descripcion">Descripción tarea:</label>
            <input
              type="text"
              name="descripcion"
              id="descripcion"
              bind:value={tarea.descripcion}
              class="form-control"
              required
            />
          </div>
          <div class="mb-3">
            <label for="prioridad">Prioridad tarea:</label>
            <select
              name="prioridad"
              class="form-control"
              id="prioridad"
              bind:value={tarea.prioridad}
            >
              <option value="1" selected>Alta</option>
              <option value="2">Media</option>
              <option value="3">Baja</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="fecha">Fecha tarea:</label>
            <input
              type="datetime-local"
              class="form-control"
              name="fecha"
              id="fecha"
              bind:value={tarea.fecha}
              required
            />
          </div>
          <div class="mb-3">
            <button type="submit">Crear tarea</button>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
          >Cerrar</button
        >
      </div>
    </div>
  </div>
</div>
<!-- Fin modal crear tarea -->

<!-- Modal Editar tarea -->
<div
  class="modal fade"
  id="editarTarea"
  tabindex="-1"
  aria-labelledby="editarTareaLabel"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="editarTareaLabel">Crear tarea</h1>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <form action="" on:submit={FuncionEditarTarea}>
          <div class="mb-3">
            <label for="titulo">Titulo tarea:</label>
            <input
              type="text"
              name="titulo"
              id="titulo"
              bind:value={tarea.titulo}
              class="form-control"
              required
            />
          </div>
          <div class="mb-3">
            <label for="descripcion">Descripción tarea:</label>
            <input
              type="text"
              name="descripcion"
              id="descripcion"
              bind:value={tarea.descripcion}
              class="form-control"
              required
            />
          </div>
          <div class="mb-3">
            <label for="prioridad">Prioridad tarea:</label>
            <select
              name="prioridad"
              class="form-control"
              id="prioridad"
              bind:value={tarea.prioridad}
            >
              <option value="1" selected>Alta</option>
              <option value="2">Media</option>
              <option value="3">Baja</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="fecha">Fecha tarea:</label>
            <input
              type="datetime-local"
              class="form-control"
              name="fecha"
              id="fecha"
              bind:value={tarea.fecha}
              required
            />
          </div>
          <div class="mb-3">
            <button type="submit">Actualizar tarea</button>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
          >Cerrar</button
        >
      </div>
    </div>
  </div>
</div>
<!-- Fin modal Editar tarea -->

<select
  name="order_by"
  class="form-control"
  id="order_by"
  bind:value={order_by}
  on:change={FuncionOrdenarPor}
>
  <option value="prioridad" selected>Prioridad</option>
  <option value="titulo">Titulo</option>
  <option value="titulo">Fecha</option>
</select>
<select
  name="order_by2"
  class="form-control"
  id="order_by2"
  bind:value={order_by2}
  on:change={FuncionOrdenarDA}
>
  <option value="desc" selected>DESCENDIENTE</option>
  <option value="asc">ASCENDIENTE</option>
</select>

<ul class="lista-tareas">
  {#if !cargando}
    {#each tareas as t}
      <li class="tarea">
        <div class="progress" style="height: 30px">
          <div
            class="w-full progress-bar bg-info p-2"
            style={`width: ${t.prioridad === "1" ? "100%" : t.prioridad === "2" ? "50%" : t.prioridad === "3" ? "30%" : ""};color:red;font-weight:600;font-size:25px;`}
            aria-valuenow={t.prioridad === "1"
              ? 100
              : t.prioridad === "2"
                ? 50
                : t.prioridad === "3"
                  ? 30
                  : ""}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {t.prioridad === "1"
              ? "Alta"
              : t.prioridad === "2"
                ? "Media"
                : t.prioridad === "3"
                  ? "Baja"
                  : ""}
          </div>
        </div>
        <h2>{t.titulo}</h2>
        <p>{t.descripcion}</p>
        <i>Fecha: {t.fecha}</i>
        <hr />
        <button
          class="btn btn-danger"
          on:click={() => {
            tarea.id = t.id;
            FuncionEliminar();
          }}>Eliminar</button
        >
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#editarTarea"
          on:click={() => {    
            tarea = t;      
          }}
        >
          Editar
        </button>
      </li>
    {/each}
  {:else}
    <h2>Cargando...</h2>
  {/if}
</ul>

<style>
  .lista-tareas {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    list-style-type: none;
    list-style: none;
    box-sizing: border-box;
    width: 100%;
  }
  .tarea {
    cursor: pointer;
    user-select: none;
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
    border: none;
    font-size: 16px;
    transition: cubic-bezier(0.19, 1, 0.22, 1) 2s all;
  }

  .tarea:hover {
    box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.3);
  }
</style>

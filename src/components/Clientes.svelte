<script>
  import { v4 as uuidv4 } from "uuid";
  import { db, app } from "./../Firebase/firebase.js";
  import { onMount } from "svelte";
  import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    getDoc,
  } from "firebase/firestore";
  import {
    deleteObject,
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes,
  } from "firebase/storage";

  let clientes = [];

  let clienteBorrado = false;

  async function obtenerClientes() {
    const querySnapshot = await getDocs(collection(db, "clientes"));
    clientes = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  const storage = getStorage();

  /*   const storage = getStorage(app);
const imagenRef = ref(storage, `imagenes/imagen1.jpg`); */

  const LimpiarDatos = () => {
    primero = "";
    ultimo = "";
    imagenCliente = "";
    imagenExtraida = null;
    imagenVista = null;

    document.getElementById("imagenCliente").value = null;
  };

  async function agregarCliente({ nombre, apellido, imagen }) {
    if (imagen != null || imagen != undefined) {
      console.log(imagen);

      const imagenRef = ref(storage, `imagenes/${uuidv4()}.${imagen.type.split("/")[1]}`);
      await uploadBytes(imagenRef, imagen);
      imagen = await getDownloadURL(imagenRef);
    }

    await addDoc(collection(db, "clientes"), { nombre, apellido, imagen });

    LimpiarDatos();

    await obtenerClientes();
  }

  async function actualizarCliente({ nombre, apellido, id, imagen }) {
    if (imagen != null) {
      const clienteRef = doc(db, "clientes", id);

      getDoc(clienteRef).then(async (doc) => {
        if (doc.exists()) {
          const cliente = doc.data(); // Obtener los datos del cliente

          if (cliente.imagen != null || cliente.imagen != undefined) {
            const imagenActual = ref(storage, `${cliente.imagen}`);
            await deleteObject(imagenActual);
          }
        } else {
          console.error("Cliente no encontrado");
        }
      });

      const imagenRef = ref(storage, `imagenes/${imagen.name}`);
      await uploadBytes(imagenRef, imagen);
      imagen = await getDownloadURL(imagenRef);

      await updateDoc(clienteRef, { nombre, apellido, imagen });
      await obtenerClientes();

      LimpiarDatos();
    } else {
      const clienteRef = doc(db, "clientes", id);
      await updateDoc(clienteRef, { nombre, apellido });
      await obtenerClientes();

      LimpiarDatos();
    }
  }

  async function eliminarCliente(id) {
    const clienteRef = doc(db, "clientes", id);

    getDoc(clienteRef).then(async (docu) => {
      if (docu.exists()) {
        console.log("existe ");

        const cliente = docu.data(); // Obtener los datos del cliente
        // Eliminar imagen si la tiene
        if (cliente.imagen != null || cliente.imagen != undefined) {
          const imagenActual = ref(storage, `${cliente.imagen}`);
          await deleteObject(imagenActual);
        }

        clienteBorrado = true;

        if (clienteBorrado) {
          await deleteDoc(doc(db, "clientes", id));
          await obtenerClientes();

          clienteBorrado = false;
        }

        LimpiarDatos();
      } else {
        console.error("Cliente no encontrado");
      }
    });
  }

  // Al montar la aplicación se van a cargar los clientes
  onMount(() => {
    obtenerClientes();
  });

  let imagenVista = null;
  let imagenCliente = null;
  let imagenExtraida = null;
  let prefix = "";
  let primero = "";
  let ultimo = "";
  let i = 0;

  /* $: filteredpersona = prefix
    ? persona.filter((person) => {
        const name = "${person.ultimo},${person.primero}";
        return name.toLowerCase().startsWith(prefix.toLowerCase());
      })
    : persona; */

  $: selected = clientes.filter((c) => c.id === i);
  $: reset_inputs(selected);

  function adiciona() {
    agregarCliente({
      nombre: primero,
      apellido: ultimo,
      imagen: imagenExtraida,
    });
  } //fin adiciona

  function actualiza() {
    actualizarCliente({
      nombre: primero,
      apellido: ultimo,
      id: i,
      imagen: imagenExtraida,
    });
  } //fin actualiza

  function borra() {
    eliminarCliente(i);
  } //fin borra

  function reset_inputs(person) {
    primero = person ? person.primero : "";
    ultimo = person ? person.ultimo : "";
  } //fin reset

  function FuncionDeseleccionarCliente() {
    LimpiarDatos();
  }
</script>

<div class="container p-4">
  <div class="row">
    <div class="col-md-12">
      <!-- <input placeholder="filtrar por prefijo" bind:value={prefix} /> -->
      <select
        bind:value={i}
        size={8}
        style="width: 100%;"
        on:change={(e) => {
          const clienteResultado = clientes.filter((c) => c.id === i)[0];
          if (clienteResultado != null) {
            primero = clienteResultado.nombre;
            ultimo = clienteResultado.apellido;
            imagenVista = clienteResultado.imagen;
          }
        }}
        on:click={(e) => {
          const clienteResultado = clientes.filter((c) => c.id === i)[0];
          if (clienteResultado != null) {
            primero = clienteResultado.nombre;
            ultimo = clienteResultado.apellido;
            imagenVista = clienteResultado.imagen;
          }
        }}
      >
        {#each clientes as cliente}
          <option value={cliente.id}
            >{cliente.nombre}, {cliente.apellido}</option
          >
        {/each}
      </select><!--fin select-->
      <br />
      <label for="imagenCliente">Imagen cliente:</label>
      <input
        type="file"
        name="imagenCliente"
        id="imagenCliente"
        bind:value={imagenCliente}
        on:change={(e) => {
          console.log(e);
          imagenExtraida = e.target.files[0];
        }}
      />
      {#if imagenExtraida != null}
        <div style="display: block;" class="mt-2 mb-2">
          <img
            src={URL.createObjectURL(imagenExtraida)}
            width="200"
            height="200"
            alt="imagen"
          />
        </div>
      {/if}
      {#if imagenVista != null}
        <div style="display: block;" class="mt-2 mb-2">
          <img src={imagenVista} width="200" height="200" alt="imagen" />
        </div>
      {/if}
      <label><input bind:value={primero} placeholder="Nombre" /></label>
      <label><input bind:value={ultimo} placeholder="Apellido" /></label>
    </div>
    <!--fin col1-->
  </div>
  <!--fin row-->
  <div class="row">
    | <div class="col-md-12">
      <div class="buttons">
        <button
          class="btn btn btn-warning"
          on:click={adiciona}
          disabled={!primero || !ultimo}
          ><i class="bi bi-pencil-fill">Crear</i></button
        >
        <button
          class="btn btn btn-primary"
          on:click={actualiza}
          disabled={!primero || !ultimo || !selected}
          ><i class="bi bi-journal-text">Actualizar</i></button
        >
        <button class="btn btn btn-danger" on:click={borra} disabled={!selected}
          ><i class="bi bi-trash">Borrar</i></button
        >
        <button class="btn btn-danger" on:click={FuncionDeseleccionarCliente}
          >Deseleccionar cliente</button
        >
      </div>
      <!--fin buttoms-->
    </div>
    <!--fin col-->
  </div>
  <!--fin row-->
</div>

<!--cierra container-->

<style>
  * {
    font-family: inherit;
    font-size: inherit;
  }
  input {
    display: block;
    margin: 0 0 0.5em 0;
  }
  .buttons {
    clear: both;
  }
</style>

<script>
  import { user } from "./../stores/user.js";
  import { LeerSesionLocal } from "./../Sesion/Leer.js";
  import { page } from "$app/stores";
  import { onMount, beforeUpdate } from "svelte";
  import logo from "$lib/images/icono_app.jpeg";

  export let inicioEnlace = "./";
  export let acercaEnlace = "./about";
  export let perfilEnlace = "./perfil";
  export let ingresarEnlace = "./login";
  export let clientesEnlace = "./clientes";
  export let peliculasEnlace = "./peliculas";
  export let tareasEnlace = "./tareas";

  $: pathname = $page.url.pathname;

  onMount(() => {
    const sesion = LeerSesionLocal();
    console.log(sesion);

    if (sesion) {
      user.setUser(sesion);
      console.log(sesion);
    } else {
      if (
        pathname === "/perfil" ||
        pathname === "/clientes" ||
        pathname === "/tareas"
      ) {
        window.location = "/login";
      }
    }
  });

  beforeUpdate(() => {
    const sesion = LeerSesionLocal();
    console.log(sesion);

    if (sesion) {
      user.setUser(sesion);
      console.log(sesion);
    } else {
      if (
        pathname === "/perfil" ||
        pathname === "/clientes" ||
        pathname === "/tareas"
      ) {
        window.location = "/login";
      }
    }
  });
</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href={inicioEnlace}>
      <img
        src={logo}
        alt="Logo"
        width="30"
        height="30"
        class="d-inline-block align-text-top rounded-circle"
      />
      Sistemas Pao
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a
            class={`nav-link ${pathname === "/about" ? "active" : ""}`}
            href={acercaEnlace}>Acerca de</a
          >
        </li>
        {#if $user != null}
          <li class="nav-item">
            <a
              class={`nav-link ${pathname === "/perfil" ? "active" : ""}`}
              href={perfilEnlace}>Perfil</a
            >
          </li>
        {/if}
        <li class="nav-item">
          <a
            class={`nav-link ${pathname === "/login" ? "active" : ""}`}
            href={ingresarEnlace}
            >{$user != null ? "Mi cuenta" : "Iniciar sesión"}</a
          >
        </li>
        {#if $user != null}
          <li class="nav-item">
            <a
              class={`nav-link ${pathname === "/clientes" ? "active" : ""}`}
              href={clientesEnlace}>Clientes</a
            >
          </li>
          <li class="nav-item">
            <a
              class={`nav-link ${pathname === "/tareas" ? "active" : ""}`}
              href={tareasEnlace}>Tareas</a
            >
          </li>
        {/if}
        <li class="nav-item">
          <a
            class={`nav-link ${pathname === "/peliculas" ? "active" : ""}`}
            href={peliculasEnlace}>Peliculas</a
          >
        </li>
      </ul>
    </div>
  </div>
</nav>

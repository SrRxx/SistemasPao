<script>
	import { eliminarSesionLocal } from './../../Sesion/Eliminar.js';
	import { user } from './../../stores/user.js';
	import { GuardarSesionLocal } from './../../Sesion/Guardar.js';
	import { LeerSesionLocal } from './../../Sesion/Leer.js';
  import { onMount } from "svelte";

  $: cargando = true;

  let email = "";
  let password = "";

  onMount(() => {
    const sesion = LeerSesionLocal();
    if (sesion) {
      user.setUser(sesion);
      cargando = false;
      console.log(sesion);
    } else {
      cargando = false;
    }
  });

  const procesarformulario = () => {
    if (!email.trim() || !password.trim()) {
      console.log("Campos vacios");
      return;
    }

    GuardarSesionLocal({
      email,
      password,
    });

    console.log("funcionando");
    user.setUser(email, password);
    console.log(email);
    console.log(password);
    console.log("ver ", $user);
  };

  /* onMount(() => {
    console.log($user);
  }); */
</script>

<div>
  {#if $user != null}
    <h1>Bienvenid@</h1>
    <ul>
      <a href="/clientes"><li>Administrar clientes</li></a>
      <a href="/tareas"><li>Administrar tareas</li></a>
      <button class="btn btn-danger" on:click={() => {
        const sesionEliminada = eliminarSesionLocal();

        if(sesionEliminada) {
          window.location = "/login";
        }
      }}>Cerrar sesión</button>
    </ul>
  {:else}
    <h1>Acceso</h1>
    <!--<form on:submit={procesarformulario()}>-->
    <div>
      <input type="text" class="form-control" placeholder="email" bind:value={email} />
      <input type="text" class="form-control" placeholder="contraseña" bind:value={password} />
      <button on:click={procesarformulario}>Acceder</button>
    </div>
  {/if}
</div>

<style>
</style>

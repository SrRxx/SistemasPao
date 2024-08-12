<script>
  import { MensajeCrear } from "./../../Mensajes/Mensajes.js";
  import { user } from "./../../stores/user.js";

  $: buscar_pelicula = "";
  $: peliculas = [];
  $: cargando = false;
  $: pagina = 1;
  $: numero_paginas = 0;
  $: numero_resultados = 0;
  $: paginacion_lista = [];

  // Opciones de configuración de la API
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzBiYTk4ZjVmM2Y1MWE2ZDVhODRmNDNkYWIwOWUwZSIsIm5iZiI6MTcyMzQ4NzE4NS45NjM2MzMsInN1YiI6IjY2YmE0YjJkMDdmNDdkOWUzMjUzOWY0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hhH06_A4UsfvPz_3OqKVQAfDeYBvVtgh9VoyeiGAtHs",
    },
  };

  const FuncionBuscarPelicula = (evento = null) => {
    if (evento != null) {
      evento.preventDefault();
    }

    if (buscar_pelicula.trim().length > 0) {
      cargando = true;

      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${buscar_pelicula}&include_adult=false&language=es-CO&page=${pagina}`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          paginacion_lista = [];
          if (response != null || response != undefined) {
            console.log(response);
            numero_resultados = response.total_results;
            peliculas = response.results;
            cargando = false;
            if (response.total_results > 0) {
              numero_paginas = response.total_pages;
              pagina = response.page;
              if (paginacion_lista.length <= 0) {
                GenerarListaPaginacion();
              }
            }
          }
        })
        .catch((err) => console.error(err));
    } else {
      // Mostrar mensaje de campo requerido con Toastify
      MensajeCrear({
        tipo: "warning",
        titulo: "Campo requerido!",
        descripcion: "El campo de búsqueda es requerido",
        duracion: 4000,
      });
    }
  };

  const PaginaAtras = () => {
    if (pagina > 1) {
      pagina--;
      FuncionBuscarPelicula();
    }
  };

  const PaginaAdelante = () => {
    if (pagina < numero_paginas) {
      pagina++;
      FuncionBuscarPelicula();
    }
  };

  const CambiarPagina = (n) => {
    pagina = n;
    FuncionBuscarPelicula();
  };

  const GenerarListaPaginacion = () => {
    if (numero_paginas > 0) {
      for (let i = 1; i <= numero_paginas; i++) {
        paginacion_lista.push(i);
      }
    }
  };
</script>

<h1>Peliculas</h1>

<form action="" on:submit={FuncionBuscarPelicula}>
  <input
    type="search"
    name="buscar_pelicula"
    id="buscar_pelicula"
    placeholder="Buscar pelicula"
    class="form-control"
    bind:value={buscar_pelicula}
    required
  />
  <input type="submit" class="btn btn-primary" value="Buscar" />
</form>

<ul class="lista-peliculas row mt-2">
  {#if cargando}
    <h3>Cargando...</h3>
  {:else}
    {#each peliculas as peli}
      <li class="col item-pelicula-nuevo">
        <img
          src={`https://image.tmdb.org/t/p/w500${peli.poster_path}`}
          width="200"
          class="h-auto imagen-pelicula"
          alt={`Imagen ${peli.title}`}
        />
        <div class="info-pelicula p-2">
          <h2><b>{peli.title}</b></h2>
          <b>Popularidad: </b>
          {peli.popularity}
        </div>
      </li>
    {/each}
    {#if numero_paginas > 0}
      <nav
        aria-label="Page navigation example"
        style="justify-content: center;margin-top: 10px;display: flex;"
      >
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#a" on:click={PaginaAtras}>Anterior</a>
          </li>
          {#each paginacion_lista as item_list}
            <li class={`page-item ${item_list == pagina ? "active" : ""}`}>
              <a
                class="page-link"
                href="#b"
                on:click={() => CambiarPagina(item_list)}>{item_list}</a
              >
            </li>
          {/each}
          <li class="page-item">
            <a class="page-link" href="#e" on:click={PaginaAdelante}
              >Siguiente</a
            >
          </li>
        </ul>
      </nav>
    {/if}
  {/if}
</ul>

<style>
  .lista-peliculas {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 10px;
    height: max-content;
    padding: 0;
    background-color: transparent;
    font-size: 16px;
    list-style: none;
    list-style-type: none;
  }
  .item-pelicula-nuevo {
    position: relative;
    width: 200px;
    height: 300px;
    transition: 1s all cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  .item-pelicula-nuevo:hover .imagen-pelicula {
    box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.5);
  }

  .item-pelicula-nuevo:hover .info-pelicula {
    visibility: visible;
    transition: cubic-bezier(0.215, 0.61, 0.355, 1) 2s all;
  }

  .imagen-pelicula {
    border-radius: 10px;
    cursor: pointer;
  }
  .info-pelicula {
    position: absolute;
    visibility: hidden;
    width: 200px;
    height: 100px;
    background-color: #fff;
    opacity: 0.8;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    bottom: 0;
    left: 12px;
    overflow-y: auto;
  }
</style>

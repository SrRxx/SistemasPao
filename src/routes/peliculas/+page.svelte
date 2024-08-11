<script>
	import { MensajeCrear } from './../../Mensajes/Mensajes.js';
	import { user } from './../../stores/user.js';

  $: buscar_pelicula = "";
  $: peliculas = [];
  $: cargando = false;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGJiZmRhOGNhOTI2ZWQ3YTQ1MTZhZjhmZGNlZmNjZiIsIm5iZiI6MTcyMzMzMzY2OC4wMzMzOTMsInN1YiI6IjY2YjdmMzQ5NTZlYjBhMDUxNDAxODJkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BmtR3YFBxINHX4EV4afcjbYSQPLJlOSGb4raDPPnzuo",
    },
  };

  const FuncionBuscarPelicula = (evento) => {
    evento.preventDefault();

    if(buscar_pelicula.trim().length > 0) {
        cargando = true;

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${buscar_pelicula}&include_adult=false&language=es-CO&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        if (response != null || response != undefined) {
          cargando = false;
          console.log(response);
          peliculas = response.results;
        }
      })
      .catch((err) => console.error(err));
    } else {
        // Mostrar mensaje de campo requerido con Toastify
        MensajeCrear({
            tipo: "warning",
            titulo: "Campo requerido!",
            descripcion: "El campo de búsqueda es requerido",
            duracion: 4000
        })
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

<ul class="lista-peliculas">
  {#if cargando}
    <h3>Cargando...</h3>
  {:else}
    {#each peliculas as peli}
      <li class="item-pelicula">
        <div class="row">
          <div class="col">
            <img
              src={`https://image.tmdb.org/t/p/w500${peli.poster_path}`}
              width="200"
              class="h-auto imagen-pelicula"
              alt={`Imagen ${peli.title}`}
            />
          </div>
          <div class="col p-2 contenido-pelicula">
            <h2>{peli.title}</h2>
            <p>
              {peli.overview != undefined
                ? peli.overview.length > 160
                  ? peli.overview.substring(0, 60) + "..."
                  : peli.overview
                : ""}
            </p>
          </div>
        </div>
      </li>
    {/each}
  {/if}
</ul>

<style>
  .lista-peliculas {
    position: relative;
    width: 100%;
    height: max-content;
    padding: 0;
    background-color: transparent;
    font-size: 16px;
    list-style: none;
    list-style-type: none;
  }
  .item-pelicula {
    position: relative;
    cursor: pointer;
    user-select: none;
    padding: 0;
    border-radius: 10px;
    border: none;
    transition: ease-in-out 1s all;
    margin-top: 12px;
    background-color: #fff;
  }
  .imagen-pelicula {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  .item-pelicula:hover {
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.4);
  }

  .contenido-pelicula {
    padding: 10px;
    white-space: normal;
  }
</style>

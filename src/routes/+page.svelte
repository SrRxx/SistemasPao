<svelte:head>
  <title>SistemasPao</title>
  <meta name="description" content="SistemasPao" />
</svelte:head>

<section>
  <h1>
    <span class="welcome"> </span>
  </h1>

  <h2>
    <ul>
      <a href="/about"><li>Acerca de</li></a>
      <a href="/login"><li>Iniciar sesión</li></a>
      <a href="/peliculas"><li>Películas</li></a>
    </ul>
  </h2>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  h1 {
    width: 100%;
  }

  .welcome {
    display: block;
    position: relative;
    width: 100%;
    height: 0;
    padding: 0 0 calc(100% * 495 / 2048) 0;
  }

  ul {
    list-style: none;
    list-style-type: none;
    box-sizing: border-box;
    width: 100%;
    gap: 10px;
    display: flex;
    flex-direction: column;
  }

  ul a {
    text-decoration: none;
    color: #222;
  }

  ul li {
    padding: 10px;

    background-color: #dfd4d4;
    font-size: 16px;
    border-radius: 10px;
  }
</style>

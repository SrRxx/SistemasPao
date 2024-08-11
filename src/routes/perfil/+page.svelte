<script>
</script>

<h1>Hola, Soy <b>Paola</b></h1>

<ul class="list-unstyled">
  <li>
    Programadora <div class="d-flex flex-row gap-2">
      <span class="badge" style="background-color: #ca6510;">HTML5</span><span
        class="badge text-bg-primary">CSS</span
      ><span class="badge text-bg-warning">JS</span>
    </div>
  </li>
  <li>De <b>Pasto, Colombia</b></li>
</ul>

<section class="timeline">
  <ul>
    <li>
      <div>
        <time>2024</time> Mi primera aplicación grande <b>SistemasPao</b>
      </div>
    </li>
    <li>
      <div>
        <time>2024</time> Aprendí Svelte
      </div>
    </li>
    <li>
      <div>
        <time>2024</time> Aprendí Programación Orientada a Objetos
      </div>
    </li>
    <li>
      <div>
        <time>2023</time> Obtuve conocimientos de Ofimática en
        <b>Cinar Sistemas</b>
      </div>
    </li>
  </ul>
</section>

<style>
  h1 {
    font-size: 2.5rem;
  }

  .timeline ul li {
    list-style-type: none;
    position: relative;
    width: 6px;
    margin: 0 auto;
    padding-top: 50px;
    background: #fff;
  }

  .timeline ul li::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: inherit;
  }

  .timeline ul li div {
    position: relative;
    bottom: 0;
    width: 400px;
    padding: 15px;
    background-color: #f45b69;
  }

  .timeline ul li div::before {
    content: "";
    position: absolute;
    bottom: 7px;
    width: 0;
    height: 0;
    border-style: solid;
  }

  .timeline ul li:nth-child(odd) div {
    left: 45px;
  }

  .timeline ul li:nth-child(odd) div::before {
    left: -15px;
    border-width: 8px 16px 8px 0;
    border-color: transparent #f45b69 transparent transparent;
  }

  .timeline ul li:nth-child(even) div {
    left: -439px;
  }

  .timeline ul li:nth-child(even) div::before {
    right: -15px;
    border-width: 8px 0 8px 16px;
    border-color: transparent transparent transparent #f45b69;
  }

  @media screen and (max-width: 600px) {
    .timeline ul li {
      margin-left: 20px;
    }

    .timeline ul li div {
      width: calc(100vw - 91px);
    }

    .timeline ul li:nth-child(even) div {
      left: 45px;
    }

    .timeline ul li:nth-child(even) div::before {
      left: -15px;
      border-width: 8px 16px 8px 0;
      border-color: transparent #f45b69 transparent transparent;
    }
  }
</style>

<script>
  import Header from "./../components/Header.svelte";
  import "../app.css";
  import { FlatToast, ToastContainer } from "svelte-toasts";
</script>

<div class="app">
  <Header />

  <main>
    <slot  />
  </main>

  <footer>
    <p>Derechos reservados <b>SistemasPao</b> &copy; 2024</p>
  </footer>
</div>

<ToastContainer let:data={data}>
    <FlatToast {data}  />
</ToastContainer>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 64rem;
    margin: 0 auto;
    box-sizing: border-box;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
  }

  @media (min-width: 480px) {
    footer {
      padding: 12px 0;
    }
  }
</style>

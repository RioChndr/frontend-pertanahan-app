<template>
  <footer class="footer">
    <div class="container-fluid d-flex flex-wrap justify-content-between">
      <nav>
        <ul>
          <li>
            <router-link :to="{ path: '/admin' }">{{ appName }}</router-link>
          </li>
        </ul>
      </nav>
      <div class="copyright d-flex flex-wrap">
        Develop by BPN Kota Bandung
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      appName: process.env.VUE_APP_APP_NAME
    };
  }
};
</script>
<style scoped>
@media screen and (min-width: 1200px) {
  .footer {
    position: fixed;
    bottom: 0;
    width: calc(100% - 230px);
    background: #fff;
    z-index: 0 !important;
    display: block;
    padding: 0 1rem;
  }

  .container-fluid {
    z-index: 0 !important;
  }
}

@media screen and (max-width: 1000px) {
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: #fff;
    z-index: 0 !important;
    display: none;
  }
  .container-fluid {
    z-index: 0 !important;
  }
}
</style>

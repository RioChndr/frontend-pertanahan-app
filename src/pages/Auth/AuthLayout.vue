<template>
  <div
    class="auth-page"
    :style="{
      backgroundImage: 'url(' + require('@/assets/img/2.png') + ')'
    }"
  >
    <div class="auth-container">
      <!-- <div class="auth-container-image"></div> -->
      <!-- <div class="auth-container-form"> -->
      <router-view></router-view>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.auth-page {
  height: 100vh;
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
  background-position: center;

  .auth-container {
    @media screen and (min-height: 400px) and (max-height: 679px) {
      height: 90vh;
    }

    @media screen and (min-height: 680px) and (max-height: 800px) {
      height: 80vh;
    }

    @media screen and (min-width: 320px) and (max-width: 680px) {
      width: 90vw;
    }

    @media screen and (min-width: 681px) and (max-width: 1200px) {
      width: 60vw;
    }

    @media screen and (min-width: 1280px) and (max-width: 1360px) {
      width: 30vw;
    }

    @media screen and (min-width: 1360px) and (max-width: 1900px) {
      width: 30vw;
    }

    @media screen and (min-width: 1900px) and (max-width: 1980px) {
      width: 25vw;
    }

    display: flex;

    box-shadow: 1px 2px 8px 1px rgba(0, 0, 0, 0.1);
    border-radius: 4px;

    padding: 1rem;
    background-color: #fff;
    justify-content: center;
  }
}
</style>

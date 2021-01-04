<template>
  <div
    class="auth-page"
    :style="{
      backgroundImage: 'url(' + require('@/assets/img/fulldashboard.png') + ')'
    }"
  >
    <img src="@/assets/img/LOGO_ATR_BPN.png" alt="" class="img-icon-place" />
    <div class="auth-container">
      <div class="d-flex align-items-center justify-content-center">
        <img src="@/assets/img/logo_pasti.png" alt="" class="icon-header" />
        <h5 class="font-weight-bold text-center mt-3" style="color: #3c3c3c">
          Pelayanan Online Sertipikat Terintegrasi <br />
          ( Pasti )<br />
          Kantor Pertanahan Kota Bandung
        </h5>
      </div>
      <!-- <hr /> -->
      <!-- <div class="auth-container-image"></div> -->
      <!-- <div class="auth-container-form"> -->
      <router-view></router-view>
      <!-- </div> -->
    </div>
    <div class="img-footer-icon">
      <img
        src="@/assets/img/LOGO_ATR_BPN.png"
        alt=""
        class="img-icon-place-footer"
      />
      <img
        src="@/assets/img/logo_pasti.png"
        alt=""
        class="img-icon-place-footer"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appTitle: process.env.VUE_APP_APP_NAME
    };
  }
};
</script>

<style lang="scss" scoped>
.auth-page {
  padding-top: 10rem;
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  .img-footer-icon {
    @media screen and (min-height: 900px) {
      display: none;
    }
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: flex;

    .img-icon-place-footer {
      height: 100px;
      width: 100px;
    }
  }

  .img-icon-place {
    position: absolute;
    left: 0;
    top: 0;
    margin-top: 7vh;
    margin-left: 7vw;
    width: 150px;
    height: 150px;

    @media screen and (max-width: 400px) {
      display: none;
    }
  }

  .icon-header {
    width: 6rem;
    @media screen and (max-width: 400px) {
      display: none;
    }
  }

  .auth-container {
    @media screen and (min-height: 400px) and (max-height: 800px) {
      height: 95vh;
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
    flex-direction: column;

    box-shadow: 1px 2px 8px 1px rgba(0, 0, 0, 0.1);
    border-radius: 4px;

    padding: 1rem;
    background-color: #fff;
    justify-content: center;
  }
}
</style>

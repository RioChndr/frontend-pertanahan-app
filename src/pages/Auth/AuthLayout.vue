<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-container-image"></div>
      <div class="auth-container-form">
        <router-view></router-view>
      </div>
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

  background-color: #f4f3ef;

  .auth-container {
    width: 50vw;
    height: 60vh;

    display: flex;

    box-shadow: 1px 2px 8px 1px rgba(0, 0, 0, 0.1);
    border-radius: 4px;

    .auth-container-image {
      flex: 1;
      background-color: #35495e;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    .auth-container-form {
      flex: 1;
      padding: 1rem;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      background-color: #fff;
    }
  }
}
</style>

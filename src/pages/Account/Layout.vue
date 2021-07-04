<template>
  <div class="container-fluid">
    <div class="card" style="min-height:80vh;">
      <div class="d-flex justify-content-between align-items-center px-4 py-2">
        <h4 class="my-3">
          Pengaturan Akun
        </h4>
      </div>

      <div class="row mb-3">
        <div class="col-md-3 col-offset-md-1">
          <ul class="list-group">
            <router-link to="/account/information">
              <li class="list-group-item" :class="isActive('information')">Informasi Akun</li>
            </router-link>
            <router-link to="/account/password">
              <li class="list-group-item" :class="isActive('password')">Password</li>
            </router-link>
          </ul>
        </div>
        <div class="col-md-8">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    isActive(name){
      return {
        active: this.$route.path.includes(name)
      }
    }
  }
}
</script>

<style>

</style>
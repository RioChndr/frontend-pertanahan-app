<template>
  <div>
    <div>
      <h5>Pengaturan informasi</h5>
    </div>
    <div>
      <div class="form-group">
        <label for="email">
          Full Name
        </label>
        <fg-input
          id="email"
          Label="Full Name"
          v-model="form.fullname"
          placeholder="Edit Name anda"
          type="text"
        ></fg-input>
      </div>
      <div class="form-group">
        <label for="fullname">
          Email
        </label>
        <fg-input
          id="fullname"
          Label="Email"
          v-model="form.email"
          placeholder="Edit Email anda"
          type="text"
        ></fg-input>
      </div>
      <div class="form-group">
        <label for="role">
          Role
        </label>
        <fg-input
          id="role"
          Label="Role"
          v-model="form.role"
          type="text"
          disabled
        ></fg-input>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" :disabled="loading">Simpan</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      form: {
        fullname: "Rio",
        email: "riochandra@gmail.com",
        role: "Admin comel",
        loading: false
      }
    }
  }
}
</script>

<style>

</style>
<template>
  <div>
    <div>
      <h5>Pengaturan Password</h5>
    </div>
    <div>
      <div class="form-group">
        <label for="email">
          Password saat ini
        </label>
        <fg-input
          Label="Password saat ini"
          v-model="form.currentPassword"
          placeholder="Masukkan Password anda saat ini"
          type="password"
        ></fg-input>
      </div>
      <div class="form-group">
        <label for="passwordnew">
          Password Baru
        </label>
        <fg-input
          id="passwordnew"
          Label="Password Baru"
          v-model="form.newPassword"
          placeholder="Masukkan Password Baru"
          type="password"
        ></fg-input>
      </div>
      <div class="form-group">
        <label for="passwordconfirm">
          Ulangi Password Baru
        </label>
        <fg-input
          id="passwordconfirm"
          Label="Ulangi Password Baru"
          v-model="form.newPassword"
          placeholder="Masukkan Ulang Password Baru"
          type="password"
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
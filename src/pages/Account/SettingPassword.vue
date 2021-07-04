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
          Konfirmasi Password Baru
        </label>
        <fg-input
          id="passwordconfirm"
          Label="Ulangi Password Baru"
          v-model="form.newPasswordConfirm"
          placeholder="Masukkan Ulang Password Baru"
          :class="{'is-invalid' : validation.isPasswordNotSame}"
          type="password"
        ></fg-input>
        <div class="invalid-feedback" v-if="validation.isPasswordNotSame">
          Password konfirmasi tidak sama dengan password baru
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" @click="updatePassword()" :disabled="isLoading">{{ isLoading ? "Loading" : "Simpan" }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/http/axios.js";

export default {
  data(){
    return {
      form: {
        currentPassword: null,
        newPassword: null,
        newPasswordConfirm: null,
      },
      validation: {
        isPasswordNotSame: false,
      },
      isLoading: false
    }
  },
  methods:{
    async updatePassword(){
      if(!Object.values(this.form).every((v) => !!v)){
        this.$toast.warning("Mohon isi semua form");
        return;
      }
      if(this.form.newPassword !== this.form.newPasswordConfirm){
        this.validation.isPasswordNotSame = true;
        this.$toast.warning("Password konfirmasi tidak sama");
        return;
      }
      this.validation.isPasswordNotSame = false;

      this.isLoading = true;
      try{
        let normalizeData = {
          old_password : this.form.currentPassword,
          new_password : this.form.newPassword,
        }
        await axios.put("users/change-password", normalizeData);
        this.$toast.success("Password berhasil diubah");
        this.form = {
          currentPassword: null,
          newPassword: null,
          newPasswordConfirm: null,
        }
      } catch(error){
        this.$toast.error(error);
      }
      this.isLoading = false;
    }
  }
}
</script>

<style>

</style>
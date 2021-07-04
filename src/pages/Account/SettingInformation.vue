<template>
  <div>
    <div>
      <h5>Pengaturan informasi</h5>
    </div>
    <div>
      <div class="form-group">
        <label for="email">
          Nama
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
        <button class="btn btn-primary" @click="showModalDetail()">Simpan</button>
      </div>
      <modal-vue v-if="modal.displayModalDetail" @close="modal.displayModalDetail = false">
        <template #header>
          <h4 class="my-2">Konfirmasi Akun</h4>
        </template>
        <template #body>
          <div>
            <div class="form-group">
              <label for="password">
                Masukkan Password anda
              </label>
              <fg-input
                id="password"
                Label="Password"
                v-model="form.password"
                type="password"
                @keyup.enter="saveInformation()"
              ></fg-input>
              <div>
                <button class="btn btn-primary" @click="saveInformation()" :disabled="isLoading">Update data</button>
              </div>
            </div>
          </div>
        </template>
      </modal-vue>
    </div>
  </div>
</template>

<script>
import axios from "@/http/axios.js";
import ModalVue from "@/components/Modal.vue";

export default {
  components:{
    ModalVue,
  },
  data(){
    return {
      form: {
        fullname: "Rio",
        email: "riochandra@gmail.com",
        role: "Admin comel",
        password: null,
      },
      modal:{
        displayModalDetail: false,
      },
      isLoading: false
    }
  },
  created(){
    this.fetchUser();
  },
  methods:{
    async fetchUser(){
      this.isLoading = true
      try {
        let result = await axios.get("/users/me");
        if(result.data){
          let normalizeData = result.data.data;
          this.form = {
            fullname: normalizeData.full_name,
            email : normalizeData.email,
            role: normalizeData.role.role_name
          }
        }
      } catch (error) {
        this.$toast.error("Gagal mengambil data");
      }
      this.isLoading = false;
    },
    async saveInformation(){
      if(!this.form.password){
        return;
      }
      this.isLoading = true;
      try{
        let normalizeData = {
          email: this.form.email,
          user_identity: null,
          full_name: this.form.fullname,
          password: this.form.password,
        } 
        let result = await axios.put("/users/change-info", normalizeData);
        this.$toast.success("Berhasil mengubah akun anda");
      } catch(error){
        console.log(error);
        this.$toast.error(error)
      }
      this.isLoading = false;
      this.modal.displayModalDetail = false;
    },
    showModalDetail(){
      this.modal.displayModalDetail = true;
      this.form.password = null;
    }
  }
}
</script>

<style>

</style>
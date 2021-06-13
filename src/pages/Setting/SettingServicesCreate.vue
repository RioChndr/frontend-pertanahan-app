<template>
  <div class="row">
    <div class="col-sm-12 col-md-6 col-lg-6 offset-md-3 offset-lg-3">
      <div class="card">
        <div class="container p-4">
          <v-loading
            :active.sync="loadingOverlay"
            :can-cancel="false"
            :is-full-page="false"
          ></v-loading>
          <div class="row">
            <div class="col">
              <fg-input
                type="text"
                label="Group Pelayanan"
                placeholder="Group Pelayanan"
                v-model="form.service_group"
              ></fg-input>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <fg-input
                type="text"
                label="Jenis Pelayanan"
                placeholder="Pelayanan"
                v-model="form.service_name"
              ></fg-input>
            </div>
          </div>

          <div class="row">
            <div class="col d-flex align-items-center justify-content-end">
              <router-link
                to="/setting/services"
                class="d-flex align-items-center mr-2"
              >
                Kembali
              </router-link>
              <button
                v-if="$route.params.id"
                class="btn btn-primary float-right"
                @click.prevent="updateService"
              >
                Update
              </button>
              <button
                v-else
                class="btn btn-primary float-right"
                @click.prevent="saveService"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiGetService, apiPatchService, apiPostService } from "../../http/api";
export default {
  data() {
    return {
      form: {
        service_name: null,
        service_group: null
      },
      loadingOverlay: false
    };
  },
  created() {
    if (this.$route.params.id) {
      this.loadingOverlay = true;
      apiGetService(this.$route.params.id)
        .then(result => {
          this.form.service_name = result.data.message.service.service_name;
          this.form.service_group = result.data.message.service.service_group;
        })
        .catch(err => {
          this.$toast.error("Terjadi Kesalahan pada Server");
        })
        .finally(() => {
          this.loadingOverlay = false;
        });
    }
  },
  methods: {
    saveService() {
      this.loadingOverlay = true;
      apiPostService(this.form)
        .then(result => {
          this.form.service_name = null;
          this.form.service_group = null;
          this.$toast.success("Pelayanan Berhasil tersimpan");
        })
        .catch(err => {
          this.$toast.error("Terjadi Kesalahan pada Server");
        })
        .finally(() => {
          this.loadingOverlay = false;
        });
    },
    updateService() {
      const id = this.$route.params.id;

      this.loadingOverlay = true;
      apiPatchService(id, this.form)
        .then(result => {
          this.form.service_name = null;
          this.form.service_group = null;
          this.$toast.success("Pelayanan Berhasil tersimpan");
        })
        .catch(err => {
          this.$toast.error("Terjadi Kesalahan pada Server");
        })
        .finally(() => {
          this.loadingOverlay = false;
        });
    }
  }
};
</script>

<style></style>

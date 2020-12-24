<template>
  <div class="card">
    <v-loading
      :active.sync="loadingOverlay"
      :can-cancel="false"
      :is-full-page="false"
    ></v-loading>

    <div class="d-flex justify-content-between align-items-center px-4 py-2">
      <h4 class="m-0">Jenis Pelayanan</h4>
      <router-link class="btn btn-primary" to="services/create">
        Tambah Pelayanan
      </router-link>
    </div>
    <hr />

    <table class="table table-hover">
      <thead>
        <th width="5%">No.</th>
        <th width="35%">Jenis Pelayanan</th>
        <th width="30%">Group</th>
        <th width="15%">Aksi</th>
      </thead>
      <tbody>
        <tr v-for="(service, i) in services" :key="service.id">
          <td>{{ i + 1 }}</td>
          <td>{{ service.service_name }}</td>
          <td>{{ service.service_group }}</td>
          <td>
            <router-link
              class="btn btn-warning btn-sm"
              :to="{ name: 'services.edit', params: { id: service.id } }"
            >
              Edit
            </router-link>
            <button
              class="btn btn-danger btn-sm mx-2"
              @click.prevent="removeService(service.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-end"></div>
  </div>
</template>

<script>
import { apiGetServices, apiRemoveService } from "../../http/api";
export default {
  data() {
    return {
      loadingOverlay: false
    };
  },
  created() {
    this.loadingOverlay = true;
    this.$store
      .dispatch("apiGetServices")
      .catch(err => {
        this.$toast.error("Terjadi Kesalahan pada Server");
      })
      .finally(() => {
        this.loadingOverlay = false;
      });
  },
  methods: {
    removeService(serviceId) {
      this.loadingOverlay = true;
      apiRemoveService(serviceId)
        .then(result => {
          this.$store.dispatch("apiGetServices");
          this.$toast.success("Pelayanan Berhasil dihapus");
        })
        .catch(err => {
          this.$toast.error("Terjadi Kesalahan pada Server");
        })
        .finally(() => {
          this.loadingOverlay = false;
        });
    }
  },
  computed: {
    services() {
      return this.$store.state.services;
    }
  }
};
</script>

<style></style>

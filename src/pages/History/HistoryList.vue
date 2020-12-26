<template>
  <div class="container-fluid">
    <v-loading
      :active.sync="loading"
      :can-cancel="false"
      :is-full-page="false"
    ></v-loading>
    <div class="row mt-2">
      <div class="col-12">
        <h4>Riwayat Permohonan</h4>
      </div>
    </div>
    <hr />
    <div class="row mb-4">
      <div class="col-md-4 col-lg-4 col-sm-12 offset-md-4 offset-lg-4">
        <input
          type="text"
          class="form-control border"
          placeholder="Email / Kode Berkas / No. Unik / Nama Pemohon / Nama Pemberi Kuasa"
          v-model="keyword"
        />
      </div>
    </div>
    <div class="row mx-1" v-for="item in documents" :key="item.id">
      <HistoryItemVue :document="item" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import HistoryItemVue from "./components/HistoryItem.vue";

export default {
  components: {
    HistoryItemVue
  },
  data() {
    return {
      keyword: null,
      pagination: {
        page: 0,
        pageSize: 10
      },
      loading: false
    };
  },
  created() {
    this.loading = true;
    this.$store
      .dispatch("apiGetAllRequest", {
        page: this.pagination.page,
        pageSize: this.pagination.pageSize,
        keyword: this.keyword
      })
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        this.$toast.error("Terjadi Kesalahan pada Server");
      })
      .finally(() => {
        this.loading = false;
      });
  },
  computed: {
    ...mapState(["documents"])
  }
};
</script>

<style></style>

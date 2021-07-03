<template>
  <div class="row">
    <div class="col-12 card">
      <table-component>
        <template #table-title>{{ table.title }}</template>
        <template #table-search>
          <i class="ti-search"></i>
          <input
            type="text"
            v-model="keywords"
            class="input-field"
            placeholder="Masukan Nomor Hak"
            @keypress.enter="searchItems"
            maxlength="5"
          />
        </template>
        <template #table-filter-status>
          <div class="row mb-4">
            <div class="col-2">Filter Kecamatan</div>
            <div class="col-4">
              <v-select
                :options="kecamatan"
                label="nama"
                :reduce="kecamatan => kecamatan.id"
                v-model="kecamatan_id"
                @input="setFilterKelurahan"
              ></v-select>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-2">Filter Kelurahan</div>
            <div class="col-4">
              <v-select
                :options="kelurahan"
                label="nama"
                :reduce="kelurahan => kelurahan.id"
                v-model="kelurahan_id"
              ></v-select>
            </div>
          </div>
        </template>
        <template #table-header>
          <th>Jenis Hak</th>
          <th>No. Hak</th>
          <th>Pemohon</th>
          <th>Jenis Permohonan</th>
          <th>Tanggal Pengajuan</th>
          <th>Status</th>
          <th>Aksi</th>
        </template>
        <template #table-body>
          <tr v-for="item in table.data" :key="item.id">
            <td>{{ item.type_hak.name }}</td>
            <td>{{ item.number_hak }}</td>
            <td>{{ item.authorized_name }}</td>
            <td>{{ item.service.service_name }}</td>
            <td>{{ item.submitted_at | moment("LL") }}</td>
            <td>{{ item.status | getStatusValue }}</td>
            <td>
              <button class="btn btn-sm btn-primary" @click="openDetail(item)">
                <i class="ti-eye"></i>
              </button>
            </td>
          </tr>
        </template>
        <template #table-pagination>
          <pagination
            v-model="pagination.page"
            :records="pagination.totalData"
            :per-page="pagination.pageSize"
            :options="{ chunk: 5 }"
            @paginate="loadMoreData"
          ></pagination>
        </template>
      </table-component>
    </div>
  </div>
</template>
<script>
import { apiGetListArchiveLogs } from "../../http/api";
import TableComponent from "../../components/TableComponent.vue";
import Pagination from "vue-pagination-2";
import axios from 'axios';

export default {
  components: {
    TableComponent,
    Pagination
  },
  data() {
    return {
      table: {
        title: "Daftar Ekspedisi Berkas Buku Tanah",
        data: []
      },

      pagination: {
        page: 1,
        pageSize: 5,
        loading: false,
        totalData: 0
      },
      keywords: null,
      kecamatan: [],
      kecamatan_id: null,
      kelurahan: [],
      kelurahan_id: null
    };
  },
  methods: {
    openDetail(value) {
      this.$router.push({ name: "archive.detail", params: { id: value.id } });
    },
    async setFilterKelurahan(id) {
      const responseKelurahan = await axios.get(
          `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${id}`
        )

        if (responseKelurahan.status) {
          this.kelurahan = responseKelurahan.data.kelurahan;
        }
    },
    async loadMoreData(options) {
      if (options === "add") {
        this.pagination.page++;
      } else {
        this.pagination.page--;
      }

      try {
        const response = await apiGetListArchiveLogs(
          this.pagination.page,
          this.pagination.pageSize,
          this.keywords,
          this.kelurahan_id
        );

        if (response.data.success) {
          if (response.data.documents.total > 0) {
            this.table.data = response.data.documents.results;
            this.pagination.totalData = response.data.documents.total;
          } else {
            this.table.data = [];
            this.pagination.totalData = 0;
          }
        }
      } catch (error) {
        this.$toast.error("terjadi kesalahan pada sistem");
      }
    },
    async searchItems() {
      this.pagination.loading = true;
      try {
        this.pagination.page = 1;
        const response = await apiGetListArchiveLogs(
          this.pagination.page,
          this.pagination.pageSize,
          this.keywords,
          this.kelurahan_id
        );

        if (response.data.success) {
          if (response.data.documents.total > 0) {
            this.table.data = response.data.documents.results;
            this.pagination.totalData = response.data.documents.total;
          } else {
            this.table.data = [];
            this.pagination.totalData = 0;
          }
        }
      } catch (error) {
        this.$toast.error("Terjadi kesalahan pada Sistem");
      } finally {
        this.pagination.loading = false;
      }
    }
  },
  async mounted() {
    try {
      const response = await apiGetListArchiveLogs(
        this.pagination.page,
        this.pagination.pageSize,
        this.keywords,
        this.kelurahan_id
      );

      const responseKecamatan = await axios.get(
        "https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=3273"
      );

      if (responseKecamatan.status === 200) {
        this.kecamatan = responseKecamatan.data.kecamatan;
      }


      if (response.data.success) {
        if (response.data.data.total > 0) {
          this.table.data = response.data.data.results;
          this.pagination.totalData = response.data.data.total;
        } else {
          this.table.data = [];
          this.pagination.totalData = 0;
        }
      }
    } catch (error) {
      this.$toast.error("terjadi kesalahan pada sistem");
    }
  }
};
</script>
<style></style>

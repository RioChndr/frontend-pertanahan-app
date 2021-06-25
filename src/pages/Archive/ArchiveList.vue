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
import { apiGetArchiveSectionList, apiGetSubmissionList } from "../../http/api";
import TableComponent from "../../components/TableComponent.vue";
import Pagination from "vue-pagination-2";

export default {
  components: {
    TableComponent,
    Pagination,
  },
  data() {
    return {
      table: {
        title: "Daftar Riwayat Permohonan",
        data: [],
      },

      pagination: {
        page: 1,
        pageSize: 5,
        loading: false,
        totalData: 0,
      },
      keywords: null,
    };
  },
  methods: {
    openDetail(value) {
      this.$router.push({ name: "archive.detail", params: { id: value.id } });
    },
    async loadMoreData(options) {
      if (options === "add") {
        this.pagination.page++;
      } else {
        this.pagination.page--;
      }

      try {
        const response = await apiGetSubmissionList(
          "",
          this.pagination.page,
          this.pagination.pageSize
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
        const response = await apiGetSubmissionList(
          this.keywords,
          this.pagination.page,
          this.pagination.pageSize
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
    },
  },
  async mounted() {
    try {
      const response = await apiGetSubmissionList(
        this.keywords,
        this.pagination.page,
        this.pagination.pageSize
      );

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
  },
};
</script>
<style>
</style>

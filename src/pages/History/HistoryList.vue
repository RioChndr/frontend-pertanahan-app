<template>
  <div class="container-fluid card">
    <table-component>
      <template #table-title>Daftar Permohonan Pelayanan</template>
      <template #table-search>
        <i class="ti-search"></i>
        <input
          type="text"
          v-model="keyword"
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
        <tr v-for="item in documents" :key="item.id">
          <td>{{ item.type_hak.name }}</td>
          <td>{{ item.number_hak }}</td>
          <td>{{ item.authorized_name }}</td>
          <td>{{ item.service.service_name }}</td>
          <td>{{ item.submitted_at | moment("LL") }}</td>
          <td>{{ item.status | getStatusValue }}</td>
          <td>
            <button
              class="btn btn-sm btn-primary"
              @click="setDisplayModal(item.id)"
            >
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
          @paginate="callPagination"
        ></pagination>
      </template>
    </table-component>

    <history-modal
      :detail="detail"
      :display-modal="displayModal"
      @update-verification-done="updateVerificationDone"
      @close="displayModal = false"
      :loading-archived="loadingArchived"
    ></history-modal>
  </div>
</template>

<script>
import HistoryModal from "./components/HistoryModal.vue";
import { FacebookLoader } from "vue-spinners-css";
import {
  apiGetDetailDocument,
  apiPostLogsDocuments,
  apiGetListFinishVerification,
} from "../../http/api";
import Pagination from "vue-pagination-2";
import TableComponent from "../../components/TableComponent.vue";

export default {
  components: {
    FacebookLoader,
    Pagination,
    HistoryModal,
    TableComponent,
  },
  data() {
    return {
      keyword: "",
      pagination: {
        page: 1,
        pageSize: 5,
        totalData: 0,
      },
      loading: false,
      loadingArchived: false,
      modal: {
        display: false,
      },
      data: [],
      displayModal: false,
      detail: null,
    };
  },
  created() {
    apiGetListFinishVerification(
      this.keyword,
      this.pagination.page,
      this.pagination.pageSize
    )
      .then((result) => {
        console.log(result);
        if (result.data.success) {
          this.data = result.data.data.results;
          this.pagination.totalData = result.data.data.total;
        } else {
          this.data = [];
          this.pagination.totalData = 0;
        }
      })
      .catch((err) => {
        console.log(err);
        this.$toast.error("Terjadi kesalahan pada Sistem");
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    loadData() {
      this.pagination.page = 1;
      apiGetListFinishVerification(
        this.keyword,
        this.pagination.page,
        this.pagination.pageSize
      )
        .then((result) => {
          if (result.data.success) {
            this.data = result.data.data.results;
            this.pagination.totalData = result.data.data.total;
          } else {
            this.data = [];
            this.pagination.totalData = 0;
          }
        })
        .catch((err) => {
          console.log(err);
          this.$toast.error("Terjadi kesalahan pada Sistem");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    closeModal() {
      this.$store.commit("setDisplayModalDetailHistory", false);
    },
    updateVerificationDone() {
      this.loadingArchived = true;
      apiPostLogsDocuments({
        document_id: this.detail.id,
        status: "process_submission",
      })
        .then((result) => {
          if (result.data.success) {
            this.$toast.success("Permohonan Selesai di Verifikasi");
            this.loadData();
          }
        })
        .catch((err) => {
          console.error(err, "error_archived");
          this.$toast.error("Terjadi Kesalahan Pada Server");
        })
        .finally(() => {
          this.displayModal = false;
          this.loadingArchived = false;
        });
    },
    deleteItem(filePath, fileId) {
      this.$toast.info("On Progress");
    },
    setDisplayModal(id) {
      apiGetDetailDocument(id)
        .then((result) => {
          this.detail = result.data.document;
        })
        .catch((err) => {
          this.$toast.error("Terjadi Kesalahan pada Sistem");
        })
        .finally(() => {
          this.displayModal = true;
        });
    },
    callPagination(params) {
      this.pagination.page = params;
      apiGetListFinishVerification(
        this.keyword,
        this.pagination.page,
        this.pagination.pageSize
      )
        .then((result) => {
          if (result.data.success) {
            this.data = result.data.data.results;
            this.pagination.totalData = result.data.data.total;
          } else {
            this.data = [];
            this.pagination.totalData = 0;
          }
        })
        .catch((err) => {
          console.log(err);
          this.$toast.error("Terjadi kesalahan pada Sistem");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    searchItems() {
      apiGetListFinishVerification(
        this.keyword,
        this.pagination.page,
        this.pagination.pageSize
      )
        .then((result) => {
          if (result.data.success) {
            this.data = result.data.data.results;
            this.pagination.totalData = result.data.data.total;
          } else {
            this.data = [];
            this.pagination.totalData = 0;
          }
        })
        .catch((err) => {
          console.log(err);
          this.$toast.error("Terjadi kesalahan pada Sistem");
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  computed: {
    documents() {
      return this.data;
    },
  },
};
</script>

<style></style>

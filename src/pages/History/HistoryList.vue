<template>
  <div class="container-fluid">
    <div class="row mt-2">
      <div class="col-12">
        <h4 class="m-0">Riwayat Permohonan</h4>
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
    <div class="card">
      <div class="row" v-if="loading">
        <div class="col-12 text-center">
          <FacebookLoader :color="'#35495e'" />
        </div>
      </div>
      <table class="table" v-else>
        <thead>
          <th>Kode. Berkas</th>
          <th>Nama</th>
          <th>No. Kontak</th>
          <th>Status</th>
          <th>Aksi</th>
        </thead>
        <tbody>
          <tr v-for="item in documents" :key="item.id">
            <td>{{ item.unique_id }}</td>
            <td>{{ item.authorized_name }}</td>
            <td>{{ item.authorized_phone_number }}</td>
            <td>{{ item.status | getStatusValue }}</td>
            <td>
              <button
                class="btn btn-sm btn-success"
                @click.prevent="setDisplayModal(item.id)"
              >
                <i class="ti-eye"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
      <div class="row">
        <div class="col-md-12 col-lg-12 mx-4">
          <pagination
            v-model="pagination.page"
            :records="pagination.totalData"
            :per-page="pagination.pageSize"
            :options="{ chunk: 5 }"
            @paginate="callPagination"
          />
        </div>
      </div>
    </div>

    <div class="row" v-if="!documents.length">
      <div class="col-12 text-center">Tidak Terdapat Riwayat Permohonan</div>
    </div>

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
import { mapState } from "vuex";
import { FacebookLoader } from "vue-spinners-css";
import {
  apiGetAllDoneRequest,
  apiGetDetailDocument,
  apiPostLogsDocuments,
} from "../../http/api";
import Pagination from "vue-pagination-2";

export default {
  components: {
    FacebookLoader,
    Pagination,
    HistoryModal,
  },
  watch: {
    keyword: function (value) {
      if (value.length >= 3) {
        this.loadData();
      } else if (value.length <= 0) {
        this.loadData();
      }
    },
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
    apiGetAllDoneRequest({
      page: this.pagination.page,
      pageSize: this.pagination.pageSize,
      keyword: this.keyword,
    })
      .then((result) => {
        if (result.data.status) {
          this.data = result.data.documents.results;
          this.pagination.totalData = result.data.documents.total;
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
      apiGetAllDoneRequest({
        page: this.pagination.page,
        pageSize: this.pagination.pageSize,
        keyword: this.keyword,
      })
        .then((result) => {
          if (result.data.status) {
            this.data = result.data.documents.results;
            this.pagination.totalData = result.data.documents.total;
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
    updateVerificationDone(id) {
      this.loadingArchived = true;
      apiPostLogsDocuments({
        document_id: this.detail.id,
        status: "finish_verification",
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
    archiveRequest() {
      const { id } = JSON.parse(
        localStorage.getItem(process.env.VUE_APP_USER_INFO)
      );
      this.loadingArchived = true;
      this.$store
        .dispatch("actionPutDocument", {
          doc_id: this.detail.id,
          form: {
            is_archived: true,
            archived_by: id,
          },
        })
        .then((result) => {
          this.$toast.success("Permohonan Berhasil di Arsipkan");
          this.$store.commit("setListRequestEmpty");
          return this.$store.dispatch("apiGetAllRequest", {
            page: 0,
            pageSize: this.pagination.pageSize,
          });
        })
        .catch((err) => {
          console.error(err, "error_archived");
          this.$toast.error("Terjadi Kesalahan Pada Server");
        })
        .finally(() => {
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
      apiGetAllDoneRequest({
        page: params,
        pageSize: this.pagination.pageSize,
        keyword: this.keyword,
      })
        .then((result) => {
          if (result.data.status) {
            this.data = result.data.documents.results;
            this.pagination.totalData = result.data.documents.total;
          } else {
            this.data = [];
            this.pagination.totalData = 0;
          }
        })
        .catch((err) => {
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
